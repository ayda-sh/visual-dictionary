import axios from "axios"

export const Image = async (word: string) => {
    const response = await axios.get(`https://api.unsplash.com/search/photos?query=${word}&client_id=_m3TapXbBmBIq5mUbKG9UKiSTZX0UgK7yi3Axtp67hE`)
    return response.data.results[0]?.urls?.regular;
};

export const Meaning = async (word: string) => {
    const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    return response.data;
}