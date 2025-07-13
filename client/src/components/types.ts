export type List = {
    display_name: string;
    list_name: string;
    list_name_encoded: string;
    books: Book[];
}

export type Book = {
    title: string;
    author: string;
    description: string;
    book_image: string;
    book_uri:string
}