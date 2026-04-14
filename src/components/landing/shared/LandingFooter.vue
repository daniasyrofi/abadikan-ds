<script setup lang="ts">
import Icon from '@/components/atoms/Icon/Icon.vue'

const linkColumns = [
  {
    title: 'Produk',
    links: [
      { label: 'Undangan Digital', href: '#' },
      { label: 'Guestbook Digital', href: '#' },
      { label: 'Kado Digital', href: '#' },
      { label: 'Katalog Tema', href: '#' },
    ],
  },
  {
    title: 'Perusahaan',
    links: [
      { label: 'Tentang Kami', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'FAQ', href: '#' },
      { label: 'Karir', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Kebijakan Privasi', href: '#' },
      { label: 'Syarat dan Ketentuan', href: '#' },
      { label: 'Kebijakan Cookie', href: '#' },
    ],
  },
]

const socials = [
  { icon: 'RiInstagramLine', label: 'Instagram', href: '#', custom: false },
  { icon: 'RiLinkedinBoxLine', label: 'LinkedIn', href: '#', custom: false },
  { icon: '', label: 'Linktree', href: '#', custom: true },
  { icon: 'RiTiktokLine', label: 'TikTok', href: '#', custom: false },
]
</script>

<template>
  <footer class="footer">
    <div class="footer-inner">
      <!-- Top section -->
      <div class="footer-top">
        <!-- Left: brand + contact + socials -->
        <div class="footer-brand">
          <!-- Logo + contact grouped together (gap: 10px) -->
          <div class="footer-logo-contact">
            <div class="footer-logo" role="img" aria-label="Abadikan.id" />

            <div class="footer-contact-row">
              <span class="footer-contact-icon">
                <Icon name="RiMapPin2Line" size="sm" />
              </span>
              <span class="footer-contact-text">
                Pedurenan Masjid, Karet Kuningan, Setiabudi,<br>
                Jakarta Selatan, Provinsi DKI Jakarta 12940
              </span>
            </div>

            <div class="footer-contact-row">
              <span class="footer-contact-icon">
                <Icon name="RiPhoneLine" size="sm" />
              </span>
              <span class="footer-contact-text">+62 851-3333-7690</span>
            </div>
          </div>

          <!-- Socials -->
          <div class="footer-socials">
            <a
              v-for="social in socials"
              :key="social.label"
              :href="social.href"
              :aria-label="social.label"
              class="footer-social-btn"
            >
              <!-- Custom SVG for Linktree (not in Remix Icons) -->
              <svg v-if="social.custom" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M13.065 8.514l3.456-3.47 1.534 1.534-3.47 3.455h4.865v2.167h-4.89l3.495 3.454-1.534 1.535L12 13.17l-4.521 4.518-1.534-1.534 3.495-3.454H4.55v-2.167h4.865L6 7.078l1.534-1.534 3.456 3.47V4.149h2.075z"/>
                <path d="M10.963 17.5h2.075V22h-2.075z"/>
              </svg>
              <Icon v-else :name="social.icon" size="sm" />
            </a>
          </div>
        </div>

        <!-- Right: link columns -->
        <div class="footer-links">
          <div
            v-for="col in linkColumns"
            :key="col.title"
            class="footer-col"
          >
            <h4 class="footer-col-title">{{ col.title }}</h4>
            <ul class="footer-col-list">
              <li
                v-for="link in col.links"
                :key="link.label"
                class="footer-col-item"
              >
                <div class="footer-col-item-inner">
                  <a :href="link.href" class="footer-col-link">{{ link.label }}</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <div class="footer-divider" />

      <!-- Copyright -->
      <p class="footer-copyright">
        © 2026 PT Abadikan Indonesia Digital all rights reserved.
      </p>

      <!-- Watermark -->
      <div class="footer-watermark" aria-hidden="true">
        <svg viewBox="0 0 1434 278" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
          <g opacity="0.1">
            <path d="M1434 274.259H1389.29V149.53C1389.29 134.502 1387.41 123.983 1382.91 117.221C1378.77 110.834 1371.64 108.204 1361.87 109.331C1347.97 111.21 1337.07 122.105 1329.18 142.392C1320.17 164.558 1316.03 195.74 1316.03 235.563V274.259H1271.7V73.6407H1315.66L1314.15 136.757H1316.03C1320.54 116.469 1328.43 100.69 1340.08 89.044C1351.72 77.3976 1365.25 71.0109 1381.03 70.2595C1396.43 69.5081 1408.83 74.3921 1418.22 84.9114C1428.74 96.9335 1434 115.342 1434 139.762V274.259Z" fill="white"/>
            <path d="M1241.64 73.64V274.259H1197.68L1199.93 231.43H1198.43C1194.3 246.457 1186.78 258.104 1175.89 266.369C1166.12 273.883 1155.23 277.64 1143.2 277.64C1128.18 278.391 1114.65 274.259 1102.63 265.993C1090.61 257.728 1081.22 245.706 1074.83 230.303C1068.07 214.148 1064.69 195.364 1064.69 173.949C1064.69 152.159 1068.07 132.999 1075.58 116.469C1082.34 101.065 1092.11 89.419 1104.13 81.5295C1116.16 73.2643 1129.3 69.8831 1144.33 70.6345C1155.23 71.0102 1165.37 74.3914 1174.39 80.4024C1184.16 87.1649 1191.67 96.5571 1196.55 108.579H1197.68V74.0157L1241.64 73.64ZM1196.93 174.325C1196.93 160.8 1195.05 149.154 1191.29 139.01C1187.54 128.491 1182.65 120.601 1175.89 114.966C1169.13 108.955 1161.24 106.325 1152.22 106.325C1143.2 106.325 1135.69 108.955 1128.93 114.59C1122.17 119.85 1116.91 127.739 1113.53 138.259C1109.77 148.778 1108.27 160.8 1108.27 174.325C1108.27 187.85 1110.14 199.496 1113.9 210.016C1117.66 220.535 1122.54 228.424 1129.3 234.06C1136.07 239.319 1143.58 242.325 1151.85 242.325C1165.75 242.325 1176.64 235.938 1184.91 223.54C1192.8 210.767 1196.93 194.612 1196.93 174.325Z" fill="white"/>
            <path d="M930.416 3.75684C929.665 3.75684 929.289 28.9281 928.913 79.2705L928.538 154.784H930.792C934.549 129.989 942.063 110.453 954.085 96.1766C965.731 82.6517 979.632 75.8893 995.411 75.1379C1008.94 74.3866 1019.83 78.1435 1028.85 86.4086C1037.11 94.2981 1042.37 104.442 1045.38 117.215C1048.38 129.989 1048.01 142.762 1044.63 155.536C1041.62 169.06 1035.61 180.331 1026.59 188.596C1016.82 198.364 1004.8 203.624 990.527 204.375V205.127C1002.92 205.878 1014.2 209.259 1023.96 214.519C1034.11 220.154 1042 228.044 1048.01 238.187C1054.77 248.707 1058.53 260.729 1059.28 274.629H1015.32C1015.32 258.099 1010.44 245.326 1001.42 236.309C993.156 227.292 982.261 223.16 968.737 223.16H960.471V188.596H967.234C977.002 188.596 984.891 185.591 991.654 180.331C999.167 173.944 1003.3 165.304 1004.05 154.409C1003.68 142.011 1001.42 132.994 997.289 127.359C992.781 122.099 986.018 119.845 977.002 120.596C962.726 122.099 951.831 133.37 943.565 153.657C934.924 175.823 930.792 207.005 930.792 247.204V274.254H886.46V3.75684H930.416Z" fill="white"/>
            <path d="M852.128 73.6352V274.254H808.173V73.6352H852.128ZM856.261 22.9171C856.261 16.1547 853.631 10.895 848.747 6.38672C843.488 2.25414 837.476 0 829.963 0C822.449 0 816.438 2.25413 811.554 6.76242C806.294 11.2707 804.04 16.5303 804.04 23.2928C804.04 30.0552 806.294 35.3148 811.554 39.8231C816.438 44.3314 822.449 46.2099 829.963 46.2099C837.476 46.2099 843.488 44.3314 848.747 39.8231C853.631 35.3148 856.261 29.6795 856.261 22.9171Z" fill="white"/>
            <path d="M730.185 3.75684H774.14V274.254H730.185L732.439 231.049H730.936C726.803 246.453 719.29 258.099 708.395 266.364C698.627 273.878 687.732 277.635 675.71 277.635C660.682 278.386 647.157 274.254 635.135 265.988C623.113 257.723 613.721 245.701 607.334 230.298C600.572 214.143 597.19 195.359 597.19 173.944C597.19 152.154 600.572 132.618 608.085 116.088C614.848 101.061 624.616 89.4142 636.638 81.149C648.66 73.2595 661.809 69.5026 676.837 70.254C687.732 71.0053 697.875 74.0109 706.892 80.0219C716.66 86.7843 724.174 96.1766 729.058 108.199H730.185V3.75684ZM729.433 173.944C729.433 160.795 727.555 149.149 723.798 139.005C720.041 128.862 715.157 120.972 708.395 114.961C701.632 109.326 693.743 106.32 684.726 106.32C675.71 106.32 667.82 109.326 661.058 114.585C654.295 120.221 649.411 128.11 645.654 138.254C641.898 148.773 640.395 160.42 640.395 173.944C640.395 187.469 642.273 199.491 646.03 209.635C649.787 220.154 654.671 228.044 661.433 233.303C668.196 238.939 675.71 241.569 684.351 241.569C697.875 241.569 708.77 235.182 717.036 222.784C725.301 210.386 729.433 194.232 729.433 173.944Z" fill="white"/>
            <path d="M575.422 73.64V274.259H531.466L533.72 231.43H532.217C528.085 246.457 520.571 258.104 509.676 266.369C499.908 273.883 489.013 277.64 476.991 277.64C461.963 278.391 448.438 274.259 436.416 265.993C424.394 257.728 415.002 245.706 408.615 230.303C401.853 214.148 398.472 195.364 398.472 173.949C398.472 152.159 401.853 132.999 409.367 116.469C416.129 101.065 425.897 89.419 437.919 81.5295C449.941 73.2643 463.09 69.8831 478.118 70.6345C489.013 71.0102 499.157 74.3914 508.173 80.4024C517.941 87.1649 525.455 96.5571 530.339 108.579H531.466V74.0157L575.422 73.64ZM530.715 174.325C530.715 160.8 528.836 149.154 525.079 139.01C521.322 128.491 516.438 120.601 509.676 114.966C502.913 108.955 495.024 106.325 486.007 106.325C476.991 106.325 469.477 108.955 462.715 114.59C455.952 119.85 450.693 127.739 447.311 138.259C443.554 148.778 442.052 160.8 442.052 174.325C442.052 187.85 443.93 199.496 447.687 210.016C451.444 220.535 456.328 228.424 463.09 234.06C469.853 239.319 477.367 242.325 485.632 242.325C499.532 242.325 510.427 235.938 518.692 223.54C526.582 210.767 530.715 194.612 530.715 174.325Z" fill="white"/>
            <path d="M251.289 3.75684V108.574H252.04C256.549 96.5522 264.062 87.16 274.206 80.3976C283.223 74.3866 293.366 71.0053 304.637 70.6296C318.913 69.8783 332.438 73.2595 344.46 81.5247C356.482 89.4142 366.25 101.061 373.012 116.464C380.151 132.994 383.908 152.154 383.908 173.944C383.908 195.359 380.526 214.143 373.764 230.298C367.001 245.701 357.985 257.723 345.963 265.988C333.941 274.254 320.416 278.386 305.388 277.635C292.991 277.635 282.095 273.878 272.703 266.364C261.433 258.099 253.919 246.453 250.162 231.425H248.659L250.913 274.254H206.958V3.75684H251.289ZM251.665 174.32C251.665 194.232 255.422 210.386 263.687 222.784C271.952 235.182 282.847 241.569 296.747 241.944C305.013 241.944 312.526 238.939 319.289 233.679C326.051 228.044 331.311 220.154 335.068 210.011C338.825 199.491 340.703 187.845 340.703 174.32C340.703 160.795 338.825 148.773 335.068 138.63C331.311 128.11 326.427 120.221 319.665 114.961C312.902 109.326 305.388 106.696 296.372 106.696C287.355 106.696 279.466 109.326 272.703 115.337C265.941 120.972 261.057 128.862 257.3 139.005C253.543 149.149 251.665 160.795 251.665 174.32Z" fill="white"/>
            <path d="M176.95 73.64V274.259H132.994L135.248 231.43H133.746C129.613 246.457 122.099 258.104 111.204 266.369C101.436 273.883 90.5413 277.64 78.5192 277.64C63.4916 278.391 49.9668 274.259 37.9447 265.993C25.9226 257.728 16.5304 245.706 10.1436 230.303C3.38121 214.148 0 195.364 0 173.949C0 152.159 3.38121 132.999 10.895 116.469C17.6574 101.065 27.4254 89.419 39.4475 81.5295C51.4695 73.2643 64.6187 69.8831 79.6463 70.6345C90.5413 71.0102 100.685 74.3914 109.701 80.4024C119.469 87.1649 126.983 96.5571 131.867 108.579H132.994V74.0157L176.95 73.64ZM132.243 174.325C132.243 160.8 130.364 149.154 126.608 139.01C122.851 128.491 117.967 120.601 111.204 114.966C104.442 108.955 96.5523 106.325 87.5358 106.325C78.5192 106.325 71.0054 108.955 64.243 114.59C57.4806 119.85 52.2209 127.739 48.8397 138.259C45.0828 148.778 43.58 160.8 43.58 174.325C43.58 187.85 45.4585 199.496 49.2154 210.016C52.9723 220.535 57.8563 228.424 64.6187 234.06C71.3811 239.319 78.8949 242.325 87.1601 242.325C101.061 242.325 111.956 235.938 120.221 223.54C128.11 210.767 132.243 194.612 132.243 174.325Z" fill="white"/>
          </g>
        </svg>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: #0a0a0a;
  overflow: hidden;
  position: relative;
}

.footer-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 60px clamp(32px, 10%, 200px);
  display: flex;
  flex-direction: column;
  gap: 40px;
}

/* ── Top ── */
.footer-top {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 40px;
}

/* ── Brand / left ── */
.footer-brand {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
  flex: 0 0 300px;
  width: 300px;
}

/* Logo + contact rows grouped tight (10px gap) */
.footer-logo-contact {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
}

.footer-logo {
  width: 186px;
  height: 60px;
  background: #fff;
  mask: url('/abadikan-wordmark.svg') no-repeat left center / contain;
  -webkit-mask: url('/abadikan-wordmark.svg') no-repeat left center / contain;
  margin-bottom: 6px;
}

.footer-contact-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.footer-contact-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: #fff;
}

.footer-contact-text {
  font-family: 'Abadikan Sans', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  color: #fff;
}

/* ── Socials ── */
.footer-socials {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 10px;
}

.footer-social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: #fff;
  text-decoration: none;
  transition: background 0.15s;
}

.footer-social-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* ── Link columns / right ── */
.footer-links {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: 40px;
  flex: 1;
}

.footer-col {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}

.footer-col-title {
  font-family: 'Abadikan Sans', sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #fff;
  margin: 0;
}

.footer-col-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.footer-col-item {
  padding: 0 4px;
  border-left: 1px solid rgba(255, 255, 255, 0.2);
  transition: border-color 0.15s;
}

.footer-col-item:hover {
  border-left-color: #fff;
}

.footer-col-item-inner {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background 0.15s;
}

.footer-col-item:hover .footer-col-item-inner {
  background: rgba(255, 255, 255, 0.1);
}

.footer-col-link {
  font-family: 'Abadikan Sans', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #fff;
  text-decoration: none;
  white-space: nowrap;
}

/* ── Divider ── */
.footer-divider {
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
}

/* ── Copyright ── */
.footer-copyright {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #fff;
  text-align: center;
  margin: 0;
}

/* ── Watermark ── */
.footer-watermark {
  width: 100%;
  pointer-events: none;
  user-select: none;
}

.footer-watermark svg {
  display: block;
  width: 100%;
  height: auto;
}

/* ── Responsive ── */
@media (max-width: 1024px) {
  .footer-top {
    flex-direction: column;
  }

  .footer-brand {
    width: 100%;
    flex: none;
  }

  .footer-links {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
}

@media (max-width: 560px) {
  .footer-links {
    grid-template-columns: 1fr;
  }

  .footer-brand {
    gap: 24px;
  }

  .footer-logo {
    width: 140px;
    height: 44px;
  }

  .footer-contact-icon {
    width: 32px;
    height: 32px;
  }

  .footer-social-btn {
    width: 36px;
    height: 36px;
  }
}
</style>
