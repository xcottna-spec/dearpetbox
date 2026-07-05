// PortOne v2 결제 헬퍼. storeId + channelKey 가 모두 있어야 결제창이 뜬다.
const storeId = process.env.NEXT_PUBLIC_PORTONE_STORE_ID;
const channelKey = process.env.NEXT_PUBLIC_PORTONE_CHANNEL_KEY;

export const isPortOneConfigured = Boolean(storeId && channelKey);

export type PayResult =
  | { ok: true; paymentId: string }
  | { ok: false; reason: "not_configured" | "cancelled" | string };

// KG이니시스 일반결제는 구매자 이메일이 형식상 필수 →
// 고객에겐 받지 않고 시스템 주소를 전달한다 (영수증 수신용, 대표님 요청: 휴대폰만 필수)
const SYSTEM_EMAIL = "order@dearpetbox.co.kr";

export async function requestSubscriptionPayment(opts: {
  orderName: string;
  totalAmount: number;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
}): Promise<PayResult> {
  if (!isPortOneConfigured) {
    return { ok: false, reason: "not_configured" };
  }

  try {
    // 브라우저 전용 SDK — 클릭 시점에 동적 import (SSR 안전)
    const PortOne = await import("@portone/browser-sdk/v2");
    const paymentId = `dp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    const response = await PortOne.requestPayment({
      storeId: storeId as string,
      channelKey: channelKey as string,
      paymentId,
      orderName: opts.orderName,
      totalAmount: opts.totalAmount,
      currency: "CURRENCY_KRW",
      payMethod: "CARD",
      customer: {
        fullName: opts.customerName,
        email: opts.customerEmail || SYSTEM_EMAIL,
        phoneNumber: opts.customerPhone,
      },
    });

    if (!response) {
      return { ok: false, reason: "cancelled" };
    }
    if (response.code) {
      // 사용자가 창을 닫은 경우 등
      return { ok: false, reason: response.message ?? response.code };
    }
    return { ok: true, paymentId };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "결제 창 호출 실패";
    return { ok: false, reason: msg };
  }
}
