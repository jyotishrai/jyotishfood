import flashMessage from "../components/common/CustomFlashAlert";
import Strings from '../translation/language'

export function IsMobileNumber(txtMobId) {
    var mob = /^[1-9]{1}[0-9]{9}$/;
    if (txtMobId.props.value === "") {
        flashMessage("Mobile number must not be blank.", "danger");
        return false;
    } else if (mob.test(txtMobId.props.value) == false) {
        flashMessage("Please enter valid mobile number.", "danger");
        txtMobId.focus();
        return false;
    }
    return true;
}