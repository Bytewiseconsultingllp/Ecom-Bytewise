'use client';

import { useEffect, useCallback } from 'react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface RazorpayOptions {
  orderId: string;
  razorpayOrderId: string;
  amount: number;
  currency?: string;
  keyId: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color?: string;
  };
  developmentMode?: boolean;
}

interface PaymentResult {
  success: boolean;
  orderId: string;
  razorpay_payment_id?: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
  error?: string;
}

interface UseRazorpayReturn {
  openPayment: (options: RazorpayOptions) => Promise<PaymentResult>;
  isReady: boolean;
}

export function useRazorpay(): UseRazorpayReturn {
  useEffect(() => {
    // Load Razorpay script
    if (typeof window !== 'undefined' && !window.Razorpay) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const openPayment = useCallback(async (options: RazorpayOptions): Promise<PaymentResult> => {
    return new Promise((resolve) => {
      // Development mode - simulate successful payment
      if (options.developmentMode) {
        setTimeout(() => {
          resolve({
            success: true,
            orderId: options.orderId,
            razorpay_payment_id: `pay_dev_${Date.now()}`,
            razorpay_order_id: options.razorpayOrderId,
            razorpay_signature: 'development_signature',
          });
        }, 1500);
        return;
      }

      if (!window.Razorpay) {
        resolve({
          success: false,
          orderId: options.orderId,
          error: 'Razorpay SDK not loaded',
        });
        return;
      }

      const razorpayOptions = {
        key: options.keyId,
        amount: options.amount,
        currency: options.currency || 'INR',
        name: 'BYTEWISE Electronics',
        description: `Payment for Order ${options.orderId}`,
        order_id: options.razorpayOrderId,
        prefill: options.prefill,
        notes: options.notes,
        theme: options.theme || { color: '#2563eb' },
        handler: function (response: any) {
          resolve({
            success: true,
            orderId: options.orderId,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          });
        },
        modal: {
          ondismiss: function () {
            resolve({
              success: false,
              orderId: options.orderId,
              error: 'Payment cancelled by user',
            });
          },
        },
      };

      const rzp = new window.Razorpay(razorpayOptions);
      rzp.on('payment.failed', function (response: any) {
        resolve({
          success: false,
          orderId: options.orderId,
          error: response.error?.description || 'Payment failed',
        });
      });
      rzp.open();
    });
  }, []);

  return {
    openPayment,
    isReady: typeof window !== 'undefined' && !!window.Razorpay,
  };
}

// RazorpayButton component for easy integration
interface RazorpayButtonProps {
  orderId: string;
  amount: number;
  onSuccess: (result: PaymentResult) => void;
  onError: (error: string) => void;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export function RazorpayButton({
  orderId,
  amount,
  onSuccess,
  onError,
  className,
  children,
  disabled,
}: RazorpayButtonProps) {
  const { openPayment } = useRazorpay();

  const handleClick = async () => {
    try {
      // Create payment order via API
      const response = await fetch('/api/v1/payment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ orderId }),
      });

      const data = await response.json();

      if (!data.success) {
        onError(data.error?.message || 'Failed to create payment');
        return;
      }

      const result = await openPayment({
        orderId,
        razorpayOrderId: data.data.razorpayOrderId,
        amount: data.data.amount,
        currency: data.data.currency,
        keyId: data.data.keyId,
        prefill: data.data.prefill,
        notes: data.data.notes,
        theme: data.data.theme,
        developmentMode: data.data.developmentMode,
      });

      if (result.success) {
        // Verify payment
        const verifyResponse = await fetch('/api/v1/payment/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`,
          },
          body: JSON.stringify({
            razorpay_order_id: result.razorpay_order_id,
            razorpay_payment_id: result.razorpay_payment_id,
            razorpay_signature: result.razorpay_signature,
            orderId,
            developmentMode: data.data.developmentMode,
          }),
        });

        const verifyData = await verifyResponse.json();

        if (verifyData.success) {
          onSuccess(result);
        } else {
          onError(verifyData.error?.message || 'Payment verification failed');
        }
      } else {
        onError(result.error || 'Payment failed');
      }
    } catch (error) {
      onError('An error occurred during payment');
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={className}
    >
      {children || `Pay ₹${(amount / 100).toLocaleString('en-IN')}`}
    </button>
  );
}

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const authData = localStorage.getItem('bytewise-auth');
    if (authData) {
      const { state } = JSON.parse(authData);
      return state?.token || null;
    }
  } catch {
    return null;
  }
  return null;
}
