export function AnnouncementBar() {
  return (
    <div className="text-muted-foreground relative overflow-hidden py-3">
      <div className="animate-marquee flex gap-5 text-xs whitespace-nowrap uppercase sm:gap-10">
        {announcements.map((announcement, index) => (
          <span key={index}>{announcement}</span>
        ))}
        {/* Duplicate for seamless loop */}
        {announcements.map((announcement, index) => (
          <span key={`dup-${index}`}>{announcement}</span>
        ))}
        {announcements.map((announcement, index) => (
          <span key={`dup-1-${index}`}>{announcement}</span>
        ))}
        {announcements.map((announcement, index) => (
          <span key={`dup-2-${index}`}>{announcement}</span>
        ))}
      </div>
    </div>
  );
}

const announcements = [
  "Black Friday Sale: Up to 25% off select drops",
  "-",
  "Black Friday Sale: Up to 25% off select drops",
  "-",
  "Black Friday Sale: Up to 25% off select drops",
  "-",
  "Black Friday Sale: Up to 25% off select drops",
  "-",
  "Black Friday Sale: Up to 25% off select drops",
  "-",
  /* "Free shipping on orders ₦200,000.00+",
  "-",
  "Sign in to save 10%",
  "-",
  "Free gift on orders ₦500,000.00+",
  "-", */
];
