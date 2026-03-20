import { Star, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Review {
  id: number;
  name: string;
  meta: string;
  text: string;
  hasImage: boolean;
  imageUrl?: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: 'Jasmine Sutton',
    meta: '5 reviews · 3 weeks ago',
    text: `Hans and his team are fantastic. This is my second time booking and the experience was seamless. Communication is quick, pricing is fair, and the cars are spotless.

I needed a last-minute airport pickup and Hans made sure our CEO had reliable transportation without any stress.

They will absolutely be my go-to car service anytime I'm in Arizona.`,
    hasImage: false
  },
  {
    id: 2,
    name: 'Tom M',
    meta: 'Local Guide · 25 reviews · 10 photos · 4 months ago',
    text: `I contacted multiple limo companies for executive transportation and the pricing was very fair. Hans took the time to understand our complex needs.

I was a bit unsure at first, but WOW, the service was outstanding. Professional, clean, brand new vehicles.

I'll be using Limo Luxury Ride for all future needs over Uber or Lyft.`,
    hasImage: true,
    imageUrl: '/src/Images/unnamed.webp'
  },
  {
    id: 3,
    name: 'Mary Allen Ramprasad',
    meta: 'Local Guide · 16 reviews · 2 photos · 4 months ago',
    text: `Hans, Mike & Jesus were fantastic. They went above and beyond for our bachelorette weekend.

Would recommend them to anyone.`,
    hasImage: true,
    imageUrl: '/src/Images/unnamed2.webp'
  }
];

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const ReviewCard = ({ review, onImageClick }: { review: Review; onImageClick: (imageUrl: string) => void }) => {
  const renderTextWithBold = (text: string) => {
    const parts = text.split('\n\n');
    return parts.map((part, index) => {
      const shouldBold = index === 0 || part.includes('WOW') || part.includes('fantastic') || part.includes('seamless');

      if (part.includes('WOW')) {
        const wowParts = part.split('WOW');
        return (
          <p key={index} className="mb-3 last:mb-0">
            {wowParts[0]}<strong className="font-semibold">WOW</strong>{wowParts[1]}
          </p>
        );
      }

      if (shouldBold && index === 0) {
        return <p key={index} className="mb-3 last:mb-0"><strong className="font-semibold">{part}</strong></p>;
      }

      return <p key={index} className="mb-3 last:mb-0">{part}</p>;
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col h-full hover:shadow-md transition-shadow duration-300">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-900 text-lg">{review.name}</h3>
          <p className="text-xs text-gray-500 mt-0.5">{review.meta}</p>
        </div>
        <div className="flex-shrink-0 ml-3 opacity-40">
          <GoogleIcon />
        </div>
      </div>

      <div className="flex gap-0.5 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>

      <div className="text-gray-700 text-sm leading-relaxed flex-grow">
        {renderTextWithBold(review.text)}
      </div>

      {review.hasImage && review.imageUrl && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <button
            onClick={() => onImageClick(review.imageUrl!)}
            className="group relative cursor-pointer"
          >
            <img
              src={review.imageUrl}
              alt="Review"
              className="w-20 h-20 rounded-lg object-cover transition-transform duration-200 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-lg transition-all duration-200 flex items-center justify-center">
              <span className="text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black bg-opacity-70 px-2 py-1 rounded">
                Click to expand
              </span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default function ReviewsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isMobile]);

  useEffect(() => {
    if (expandedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [expandedImage]);

  const handleImageClick = (imageUrl: string) => {
    setExpandedImage(imageUrl);
  };

  const handleCloseModal = () => {
    setExpandedImage(null);
  };

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header - Top Left Only */}
        <div className="mb-10">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <GoogleIcon />
              <h2 className="text-2xl font-semibold text-gray-900">Google Reviews</h2>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-xl font-semibold text-gray-900">5.0</span>
            </div>
          </div>
        </div>

        {/* Desktop: 3 Cards Side by Side */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} onImageClick={handleImageClick} />
          ))}
        </div>

        {/* Mobile/Tablet: Carousel */}
        <div className="lg:hidden">
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {reviews.map((review) => (
                <div key={review.id} className="w-full flex-shrink-0 px-2">
                  <ReviewCard review={review} onImageClick={handleImageClick} />
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index ? 'w-8 bg-gray-800' : 'w-2 bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {expandedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4"
          onClick={handleCloseModal}
        >
          <button
            onClick={handleCloseModal}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors p-2"
            aria-label="Close image"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={expandedImage}
            alt="Expanded review"
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
