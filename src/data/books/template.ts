import { BookType } from "../../components/bookComponents/Book";

export const template: BookType = {

    title: 'title of book',
    paragraphs: [
        {
            subTitle: `Meet the family`,
            strings: `
                p 1
                `
        },
        {
            subTitle: `The Mission`,
            strings: `
                p 2
                `
        }
    ]
};