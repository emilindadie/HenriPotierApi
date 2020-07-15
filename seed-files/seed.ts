import {CardDto } from "src/models";

export const cardsSeed : CardDto[] = [
    // This card has expired (06/2020)
    {
        cardNumber: 678765453,
        cryptogramme: 678,
        expiration: 1590962400000,
        solde: 1000
    },
    // This card is valid to used (expired in 12/2030)
    {
        cardNumber: 188767453,
        cryptogramme: 567,
        expiration: 1922310000000,
        solde: 9000
    },
];