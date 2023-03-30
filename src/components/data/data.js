import axios from "axios";

export const getCandidates = async() => {
    const url = "http://localhost:3333/api/candidates";
    const res = await axios.get(url);

    return res;
} 