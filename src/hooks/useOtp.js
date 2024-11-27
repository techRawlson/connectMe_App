import axios from "axios";

export const useOtp = () => {
    const generateOtp = (length = 6) => {
        const min = Math.pow(10, length - 1); // Minimum number for the specified length
        const max = Math.pow(10, length) - 1; // Maximum number for the specified length
        let OTP = Math.floor(min + Math.random() * (max - min + 1)).toString();
        console.log("OTP is", OTP);
        return OTP;

    };

    const sendOtp = async (mobileNumber, otp) => {
        const URL = `https://sms.paragalaxy.com/smpp_api/sms?token=7caab167db42fb832cf6ca9f68eebae6&To=${mobileNumber}&Text=Your%20verification%20code%20is%20${otp}.%20Please%20enter%20OTP%20to%20confirm%20mobile%20number.%20Parahittech.com&tid=1607100000000107353`;

        // let URL = `https://sms.paragalaxy.com/smpp_api/sms?token=7caab167db42fb832cf6ca9f68eebae6&To=${mobileNumber}&Text=Your%20verification%20code%20is%20${otp}.%20Please%20enter%20OTP%20to%20confirm%20mobile%20number.%20Parahittech.com&tid=1607100000000107353`
        // let URL = `https://sms.paragalaxy.com/smpp_api/sms?token=7caab167db42fb832cf6ca9f68eebae6&To=9671059942&Text=Your%20verification%20code%20is%20999999.%20Please%20enter%20OTP%20to%20confirm%20mobile%20number.%20Parahittech.com&tid=1607100000000107353`

        try {
            const response = await axios.post(URL);
            console.log("Message Send:f", response.data);

            return response.data.status === "200 Ok";
        } catch {
            return false;
        }
    };

    return { generateOtp, sendOtp };
};
