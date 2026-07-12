import type { Metadata } from "next";
import { BRAND, COMPANY } from "@/data/brand";
import LegalLayout, { LegalSection } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: `개인정보처리방침 | ${BRAND.name}`,
  robots: { index: false },
};

// 개인정보보호법 제30조 필수 기재사항 기준으로 작성.
// 사업자 식별정보는 data/brand.ts(COMPANY)에서 일괄 관리한다.
const OUTSOURCING = [
  ["(주)카페24", "쇼핑몰 호스팅, 주문·회원 시스템 운영", "위탁계약 종료 시까지"],
  ["결제대행사(PG)", "결제 처리 및 결제 도용 방지", "위탁계약 종료 시까지"],
  ["택배사", "상품 배송", "위탁계약 종료 시까지"],
  ["(주)카카오", "카카오톡 알림톡·상담 메시지 발송", "위탁계약 종료 시까지"],
];

const RETENTION = [
  ["계약 또는 청약철회 등에 관한 기록", "5년", "전자상거래법"],
  ["대금결제 및 재화 등의 공급에 관한 기록", "5년", "전자상거래법"],
  ["소비자의 불만 또는 분쟁처리에 관한 기록", "3년", "전자상거래법"],
  ["표시·광고에 관한 기록", "6개월", "전자상거래법"],
  ["서비스 방문(접속) 기록", "3개월", "통신비밀보호법"],
];

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="개인정보처리방침"
      intro={`${COMPANY.legalName}(이하 "회사")는 개인정보보호법 등 관련 법령을 준수하며, 이용자의 개인정보를 보호하기 위해 다음과 같이 개인정보처리방침을 수립·공개합니다.`}
    >
      <LegalSection title="제1조 (수집하는 개인정보의 항목 및 방법)">
        <p>회사는 다음의 개인정보를 수집합니다.</p>
        <ul>
          <li>회원가입: 이메일 주소, 비밀번호, 휴대폰 번호</li>
          <li>주문·결제·배송: 주문자·수취인 성명, 배송지 주소, 연락처, 결제 기록 (카페24 쇼핑몰 및 결제대행사를 통해 수집)</li>
          <li>맞춤 진단: 반려견 정보(이름, 견종, 나이, 체중, 성별, 알레르기, 건강 고민, 취향) — 개인을 식별하지 않는 정보이나 회원 계정과 연계되어 개인정보에 준하여 보호합니다.</li>
          <li>자동 수집: 서비스 이용기록, 접속 로그, 쿠키, 기기 정보 (웹사이트 이용 과정에서 자동 생성·수집)</li>
        </ul>
      </LegalSection>

      <LegalSection title="제2조 (개인정보의 처리 목적)">
        <ul>
          <li>회원 가입·관리, 본인 확인, 부정 이용 방지</li>
          <li>반려견 맞춤 간식 큐레이션 및 정기구독 박스 제공</li>
          <li>주문·결제·배송 및 반품·포인트 처리</li>
          <li>배송 안내, 서비스 공지 등 알림 발송(카카오톡 알림톡·문자)</li>
          <li>서비스 개선, 통계 분석(비식별 처리 후 활용)</li>
        </ul>
      </LegalSection>

      <LegalSection title="제3조 (개인정보의 보유 및 이용기간)">
        <p>
          회원 탈퇴 시 지체 없이 파기합니다. 다만 관계 법령에 따라 아래 기간 동안
          보존합니다.
        </p>
        <table>
          <thead>
            <tr>
              <th>보존 항목</th>
              <th>기간</th>
              <th>근거 법령</th>
            </tr>
          </thead>
          <tbody>
            {RETENTION.map((r) => (
              <tr key={r[0]}>
                <td>{r[0]}</td>
                <td>{r[1]}</td>
                <td>{r[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </LegalSection>

      <LegalSection title="제4조 (개인정보의 제3자 제공)">
        <p>
          회사는 이용자의 개인정보를 제3자에게 제공하지 않습니다. 다만 이용자가
          사전에 동의한 경우, 법령의 규정에 의하거나 수사기관이 법령에 정해진
          절차와 방법에 따라 요청한 경우에는 예외로 합니다.
        </p>
      </LegalSection>

      <LegalSection title="제5조 (개인정보 처리의 위탁)">
        <p>회사는 원활한 서비스 제공을 위해 다음과 같이 개인정보 처리를 위탁합니다.</p>
        <table>
          <thead>
            <tr>
              <th>수탁자</th>
              <th>위탁 업무</th>
              <th>보유 기간</th>
            </tr>
          </thead>
          <tbody>
            {OUTSOURCING.map((o) => (
              <tr key={o[0]}>
                <td>{o[0]}</td>
                <td>{o[1]}</td>
                <td>{o[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          또한 맞춤 진단 데이터의 보관을 위해 클라우드 서비스(Supabase Inc., 미국
          등 소재)를 이용하며, 이 과정에서 제1조의 진단 정보가 국외 서버에 저장될
          수 있습니다. 이전 방법: 서비스 이용 시 네트워크를 통한 전송 / 이전 항목:
          제1조의 맞춤 진단 정보 / 보유 기간: 위탁계약 종료 시까지.
        </p>
      </LegalSection>

      <LegalSection title="제6조 (개인정보의 파기 절차 및 방법)">
        <p>
          보유 기간이 경과하거나 처리 목적이 달성된 개인정보는 지체 없이
          파기합니다. 전자적 파일은 복구할 수 없는 방법으로 영구 삭제하고, 종이
          문서는 분쇄하거나 소각합니다.
        </p>
      </LegalSection>

      <LegalSection title="제7조 (정보주체의 권리·의무 및 행사 방법)">
        <p>
          이용자는 언제든지 자신의 개인정보에 대한 열람·정정·삭제·처리정지를
          요구할 수 있습니다. 마이페이지에서 직접 처리하거나, 제10조의
          개인정보 보호책임자에게 서면·이메일로 요청하시면 지체 없이
          조치하겠습니다. 만 14세 미만 아동의 개인정보는 수집하지 않습니다.
        </p>
      </LegalSection>

      <LegalSection title="제8조 (개인정보의 안전성 확보 조치)">
        <ul>
          <li>비밀번호 등 중요 정보의 암호화 저장</li>
          <li>개인정보 접근 권한의 최소화 및 접근 통제</li>
          <li>접속 기록의 보관 및 위·변조 방지</li>
          <li>보안 프로그램을 통한 기술적 보호</li>
        </ul>
      </LegalSection>

      <LegalSection title="제9조 (쿠키 등 자동 수집 장치)">
        <p>
          회사는 서비스 이용 분석을 위해 쿠키 및 Google Analytics를 사용할 수
          있습니다. 이용자는 브라우저 설정에서 쿠키 저장을 거부할 수 있으며, 이
          경우 일부 서비스 이용에 제한이 있을 수 있습니다.
        </p>
      </LegalSection>

      <LegalSection title="제10조 (개인정보 보호책임자)">
        <p>
          개인정보 보호책임자: {COMPANY.privacyOfficer} / 이메일: {COMPANY.email}{" "}
          / 카카오톡 채널:{" "}
          <a href={COMPANY.kakaoUrl} className="underline">
            디어펫 채널
          </a>
        </p>
        <p>
          개인정보 침해에 대한 신고·상담: 개인정보침해신고센터(국번없이 118),
          개인정보분쟁조정위원회(1833-6972), 대검찰청 사이버수사과(1301),
          경찰청 사이버수사국(182)
        </p>
      </LegalSection>

      <LegalSection title="제11조 (고지의 의무)">
        <p>
          본 방침의 내용이 변경되는 경우 시행 7일 전부터 웹사이트 공지사항을 통해
          알립니다.
        </p>
        <p>시행일: {COMPANY.termsEffectiveDate}</p>
      </LegalSection>
    </LegalLayout>
  );
}
