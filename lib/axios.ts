import axios from "axios"

export const Image = async (word: string) => {
    const response = await axios.get(`https://api.unsplash.com/search/photos?query=${word}&client_id=kCcPal_4Lcugu0D96C274niBBRkTTilhWk8uS6-Q0Wk`)
    return response.data.results[0]?.urls?.regular;
};

export const Meaning = async (word: string) => {
    const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    return response.data;
}