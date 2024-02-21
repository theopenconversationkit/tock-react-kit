export interface TockAccessibility {
  input?: InputAccessibility;
  carousel?: CarouselAccessibility;
  qrCarousel?: QRCarouselAccessibility;
  image?: ImageAccessibility;
  closeButtonLabel?: string;
}

export interface ImageAccessibility {
  zoomedImageLabel?: string;
  zoomButtonLabel?: string;
}

export interface CarouselAccessibility {
  roleDescription?: string;
  slideRoleDescription?: string;
  previousButtonLabel?: string;
  nextButtonLabel?: string;
}

export interface QRCarouselAccessibility {
  previousButtonLabel?: string;
  nextButtonLabel?: string;
}

export interface InputAccessibility {
  sendButtonLabel?: string;
  clearButtonLabel?: string;
}

export default TockAccessibility;
