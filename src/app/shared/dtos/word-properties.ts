export interface Word {
    head: Head;
    def?: (DefEntity)[] | null;
}
export interface Head {
}
export interface DefEntity {
    text: string;
    pos: string;
    ts: string;
    tr?: (TrEntity)[] | null;
}
export interface TrEntity {
    text: string;
    pos: string;
    gen: string;
    fr: number;
    ts: string;
    syn?: (SynEntity)[] | null;
    mean?: (MeanEntity)[] | null;
}
export interface SynEntity {
    text: string;
    pos: string;
    gen: string;
    fr: number;
    ts: string;
}
export interface MeanEntity {
    text: string;
}
