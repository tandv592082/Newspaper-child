import closePopUp from '../../utils/closePopUp';
import FormPopup from '../contactForm';
import APP from '../../constants/app';

export default class Popup {
    constructor(urlImage = APP.DEFAULT_POPUP_IMG_URL) {
        this.urlImageAds = urlImage;
        this.popupAdsContainer = $('.price-popup-ads');
        this.poupForm = new FormPopup('pop-up');
        this.btnPopupClose = $('.close-popup-btn');
        this.imgOfPopup = $('#img-popup');

        // init popup
        this.handleButtonCloseClick();
        this.poupForm.init();
    }

    // handle button close popup click
    handleButtonCloseClick = () => {
        closePopUp(0, null);
    };

    // set image for popup
    setImgForPopup = () => {
        this.imgOfPopup.attr('src', this.urlImageAds);
    };

    // show popup
    show = () => {
        this.setImgForPopup();
        if (this.popupAdsContainer.is(':hidden')) {
            this.popupAdsContainer.css('display', 'flex');
        }
    };
}