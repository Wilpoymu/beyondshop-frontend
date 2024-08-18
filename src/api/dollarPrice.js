import axios from 'axios';

export const getDollarPrice = async () => {
    axios.get('https://www.datos.gov.co/resource/mcec-87by.json')
        .then((res) => {
            const dollarPrice = res.data[0].valor;
            return dollarPrice;
        })
        .catch((error) => {
            console.error('Error fetching dollar price:', error);
            throw error;
        });
};

const dollarPrice = getDollarPrice()

console.log(dollarPrice)