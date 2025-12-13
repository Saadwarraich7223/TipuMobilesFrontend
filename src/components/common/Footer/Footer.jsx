const Footer = () => {
  const linkSections = [
    {
      title: "Quick Links",
      links: ["Home", "Best Sellers", "Offers & Deals", "Contact Us", "FAQs"],
    },
    {
      title: "Need Help?",
      links: [
        "Delivery Information",
        "Return & Refund Policy",
        "Payment Methods",
        "Track your Order",
        "Contact Us",
      ],
    },
    {
      title: "Follow Us",
      links: ["Instagram", "Twitter", "Facebook", "YouTube"],
    },
  ];

  return (
    <div className="px-6 md:px-16 shadow-[0_-2px_4px_rgba(0,0,0,0.1)] bg-main mt-5 lg:px-24 xl:px-32">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10  text-gray-800 border-b border-gray-500/30 ">
        <div>
          {/* <img className="w-50 " src={assets.logo} /> */}
          <p className="max-w-[410px]  mt-6 text-md">
            Discover the latest mobile accessories—from stylish cases to fast
            chargers—all in one place. Shop quality gear designed to protect,
            power, and enhance your mobile experience.
          </p>
        </div>
        <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
          {linkSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">
                {section.title}
              </h3>
              <ul className="text-sm space-y-1">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="hover:underline transition">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <p className="py-4 text-center text-sm font-[500] text-gray-800/80">
        Copyright 2025 © Tipu Mobiles All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
