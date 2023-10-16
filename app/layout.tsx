import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}

        {/* <script src="https://www.eventbrite.com/static/widgets/eb_widgets.js"></script> */}
        {/* <script type="text/javascript">
    var exampleCallback = function () {
        console.log('Order complete!')
    };

    window.EBWidgets.createWidget({
        widgetType: 'checkout',
        eventId: '52766401728',
        modal: true,
        modalTriggerElementId: 'example-widget-trigger',
        onOrderComplete: exampleCallback,
    });
</script> */}

        <Script
          src="https://www.eventbrite.com/static/widgets/eb_widgets.js"
          strategy="beforeInteractive"
        ></Script>
      </body>
    </html>
  );
}
