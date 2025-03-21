export interface Message {
    _id: string;
    sender: { username: string, _id: string };
    receiver: { username: string, _id: string };
    content: string;
    timestamp: string;
}
