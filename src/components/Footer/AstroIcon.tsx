import { useStore } from "@nanostores/react";
import { themeStore } from "@/store/contextStore";

type Prop = {
  size: number;
};

const AstroIcon = ({ size }: Prop) => {
  const theme = useStore(themeStore);
  const heightToWidthRatio = 107 / 85;
  return (
    <div style={{ width: size, height: size }}>
      {theme === "light" ? (
        <svg
          width={size}
          height={size * heightToWidthRatio}
          viewBox="0 0 85 107"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M27.5893 91.1365C22.7555 86.7178 21.3443 77.4335 23.3583 70.7072C26.8503 74.948 31.6888 76.2914 36.7005 77.0497C44.4374 78.2199 52.0358 77.7822 59.2231 74.2459C60.0453 73.841 60.8052 73.3027 61.7036 72.7574C62.378 74.714 62.5535 76.6892 62.3179 78.6996C61.7452 83.5957 59.3086 87.3778 55.4332 90.2448C53.8835 91.3916 52.2437 92.4167 50.6432 93.4979C45.7262 96.8213 44.3959 100.718 46.2435 106.386C46.2874 106.525 46.3267 106.663 46.426 107C43.9155 105.876 42.0817 104.24 40.6844 102.089C39.2086 99.8193 38.5065 97.3081 38.4696 94.5909C38.4511 93.2686 38.4511 91.9345 38.2733 90.6309C37.8391 87.4527 36.3471 86.0297 33.5364 85.9478C30.6518 85.8636 28.37 87.6469 27.7649 90.4554C27.7187 90.6707 27.6517 90.8837 27.5847 91.1341L27.5893 91.1365Z"
            fill="#17191E"
          />
          <path
            d="M0 69.5866C0 69.5866 14.3139 62.6137 28.6678 62.6137L39.4901 29.1204C39.8953 27.5007 41.0783 26.3999 42.4139 26.3999C43.7495 26.3999 44.9325 27.5007 45.3377 29.1204L56.1601 62.6137C73.1601 62.6137 84.8278 69.5866 84.8278 69.5866C84.8278 69.5866 60.5145 3.35233 60.467 3.21944C59.7692 1.2612 58.5911 0 57.0029 0H27.8274C26.2392 0 25.1087 1.2612 24.3634 3.21944C24.3108 3.34983 0 69.5866 0 69.5866Z"
            fill="#17191E"
          />
        </svg>
      ) : (
        <svg
          width={size}
          height={size * heightToWidthRatio}
          viewBox="0 0 85 107"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M27.5894 91.1365C22.7555 86.7178 21.3444 77.4335 23.3583 70.7072C26.8503 74.948 31.6888 76.2914 36.7005 77.0497C44.4375 78.2199 52.0359 77.7822 59.2232 74.2459C60.0454 73.841 60.8052 73.3027 61.7036 72.7574C62.378 74.714 62.5535 76.6892 62.318 78.6996C61.7452 83.5957 59.3086 87.3778 55.4332 90.2448C53.8835 91.3916 52.2437 92.4167 50.6432 93.4979C45.7262 96.8213 44.3959 100.718 46.2435 106.386C46.2874 106.525 46.3267 106.663 46.426 107C43.9155 105.876 42.0817 104.24 40.6845 102.089C39.2087 99.8193 38.5066 97.3081 38.4696 94.5909C38.4511 93.2686 38.4511 91.9345 38.2733 90.6309C37.8391 87.4527 36.3471 86.0297 33.5364 85.9478C30.6518 85.8636 28.37 87.6469 27.7649 90.4554C27.7187 90.6707 27.6517 90.8837 27.5847 91.1341L27.5894 91.1365Z"
            fill="white"
          />
          <path
            d="M27.5894 91.1365C22.7555 86.7178 21.3444 77.4335 23.3583 70.7072C26.8503 74.948 31.6888 76.2914 36.7005 77.0497C44.4375 78.2199 52.0359 77.7822 59.2232 74.2459C60.0454 73.841 60.8052 73.3027 61.7036 72.7574C62.378 74.714 62.5535 76.6892 62.318 78.6996C61.7452 83.5957 59.3086 87.3778 55.4332 90.2448C53.8835 91.3916 52.2437 92.4167 50.6432 93.4979C45.7262 96.8213 44.3959 100.718 46.2435 106.386C46.2874 106.525 46.3267 106.663 46.426 107C43.9155 105.876 42.0817 104.24 40.6845 102.089C39.2087 99.8193 38.5066 97.3081 38.4696 94.5909C38.4511 93.2686 38.4511 91.9345 38.2733 90.6309C37.8391 87.4527 36.3471 86.0297 33.5364 85.9478C30.6518 85.8636 28.37 87.6469 27.7649 90.4554C27.7187 90.6707 27.6517 90.8837 27.5847 91.1341L27.5894 91.1365Z"
            fill="url(#paint0_linear_1_59)"
          />
          <path
            d="M0 69.5866C0 69.5866 14.3139 62.6137 28.6678 62.6137L39.4901 29.1204C39.8953 27.5007 41.0783 26.3999 42.4139 26.3999C43.7495 26.3999 44.9325 27.5007 45.3377 29.1204L56.1601 62.6137C73.1601 62.6137 84.8278 69.5866 84.8278 69.5866C84.8278 69.5866 60.5145 3.35233 60.467 3.21944C59.7692 1.2612 58.5911 0 57.0029 0H27.8274C26.2392 0 25.1087 1.2612 24.3634 3.21944C24.3108 3.34983 0 69.5866 0 69.5866Z"
            fill="white"
          />
          <defs>
            <linearGradient
              id="paint0_linear_1_59"
              x1="22.4702"
              y1="107"
              x2="69.1451"
              y2="84.9468"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#D83333" />
              <stop offset="1" stopColor="#F041FF" />
            </linearGradient>
          </defs>
        </svg>
      )}
    </div>
  );
};

export default AstroIcon;
