import { useHistory } from "react-router-dom";
import { useQuery } from "../../App";

const CountryDetails = () => {

    const query = useQuery();
    const history = useHistory();

    return (
        <div onClick={() => { history.goBack() }}>GO BACK</div>
    );
}

export default CountryDetails;