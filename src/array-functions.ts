/*
* This file contains list of lodash like array functions to be implemented
* While implementing these functions, don't use any native arrays methods (except spread operator, 'push', 'pop', 'unshift' and 'shift')
* See array method documentation at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
* */

type ForEachFunction<T> = (data: T, index: number, arr: T[]) => void;
export function forEach<T>(arr: T[], callback: ForEachFunction<T>) {
    // Prefilled example
    for(let i = 0; i<arr.length; i++) {
        const item = arr[i];
        callback(item, i, arr);
    }
}

type SomeFunction<T> = (data: T, index: number, arr: T[]) => boolean;
export function some<T>(arr: T[], callback: SomeFunction<T>): boolean {
    // Prefilled example
    for(let i = 0; i<arr.length; i++) {
        const item = arr[i];
        if(callback(item, i, arr)) {
            return true;
        }
    }
    return false;
}

type EveryFunction<T> = (data: T, index: number, arr: T[]) => boolean;
export function every<T>(arr: T[], callback: EveryFunction<T>): boolean {
    // TODO return true if every item in 'arr' return true when invoked with 'callback', otherwise return false
    for (let i = 0; i<arr.length; i++) {
        const item = arr[i];
        if (!callback(item, i , arr)) {
            return false;
        }
    }
    return true;
}

type FindFunction<T> = (data: T, index: number, arr: T[]) => boolean;
export function find<T>(arr: T[], callback: FindFunction<T>): T | undefined {
    // TODO return first item in 'arr' that returns true when invoked with callback
    for(let i = 0; i<arr.length; i++){
        const item = arr[i]
        if (callback(item, i, arr)){
            return item;
        }
    }
    return undefined;
}

type FindIndexFunction<T> = (data: T, index: number, arr: T[]) => boolean;
export function findIndex<T>(arr: T[], callback: FindIndexFunction<T>): number {
    // TODO return index of first item in 'arr' that returns true when invoked with 'callback', otherwise return -1
    for (let i = 0; i<arr.length; i++) {
        const item = arr[i];
        if (callback(item, i, arr)) {
            return i;
        }
    }
    return -1;
}


type FilterFunction<T> = (data: T, index: number, arr: T[]) => boolean;
export function filter<T>(arr: T[], callback: FilterFunction<T>): T[] {
    const acc: T[] = [];
    // TODO return list of all items in 'arr' that return true when invoked with item
    for (let i = 0; i<arr.length; i++){
        const item = arr[i];
        if (callback(item, i, arr)){
            acc.push(item);
        }
    }
    return acc;
}

type MapFunction<T, R> = (data: T, index: number, arr: T[]) => R;
export function map<T, R>(arr: T[], callback: MapFunction<T, R>): R[] {
    const acc: R[] = [];
    // TODO collect and map all items in 'arr' to type R by invoking 'callback'
    for (let i = 0; i<arr.length; i++){
        const item = arr[i];
        acc.push(callback(item, i, arr));
    }
    return acc;
}

type FlatMapFunction<T, R> = (data: T, index: number, arr: T[]) => R[] | R;
export function flatMap<T, R>(arr: T[], callback: FlatMapFunction<T, R>): R[] {
    const acc: R[] = [];
    // TODO collect and map all items in 'arr' to type R by invoking 'callback'
    //  - If callback return a array (use Array.isArray function), flatten the output by adding them all to be output array
    for(let i = 0; i < arr.length; i++) {
        const item = callback(arr[i], i, arr);
        if (Array.isArray(item)) {
            for(let i = 0; i < item.length; i++) {
                acc.push(item[i]);
            }
        } else if (!Array.isArray(item)){
            acc.push(item);
        }
    }
    return acc;
}

export function reverse<T>(arr: T[]): T[] {
    // TODO return 'arr' in reverse order using forloop (this operation should be mutable)
    for (let i = 0; i<arr.length / 2; i++ ) {
        const temp = arr[i];
        arr[i] = arr[arr.length -1 - i];
        arr[arr.length -1 -i] = temp;
    }
    return arr;
}

type ReduceFunction<T, R> = (acc: R, data: T, index: number, arr: T[]) => R;
export function reduce<T, R>(arr: T[], callback: ReduceFunction<T, R>, initialValue: R): R {
    let acc: R = initialValue;
    // TODO accumulate 1 result in forloop using 'callback'
    for (let i = 0; i<arr.length; i++) {
        const item = arr[i]
        acc = callback(acc, item, i, arr);
    }
    return acc;
}

export function slice<T>(arr: T[], start= 0, end = arr.length): T[] {
    const acc: T[] = [];
    /* TODO
        - return a new array using forloop, that consists of items between start and end
        - negative integers for start and end should be interpreted as (n)th from the tail of the list (for example (-1) means last and (-2) means second last index, etc.)
        - if start item is before end item return empty list
    */
    let newStartValue = start;
    let newEndValue = end;
    if (start < 0) {
        newStartValue = arr.length - Math.abs(start);
    }
    if (end < 0) {
        newEndValue = arr.length - Math.abs(end);
    }
    if (newStartValue > newEndValue) {
        return [];
    }
    for (let i = newStartValue; i < newEndValue; i++) {
        acc.push(arr[i]);
    }
    return acc;
}

export function splice<T>(arr: T[], start= 0, deleteCount = arr.length - start, ...items: T[]): T[] {
    // TODO See splice documentation at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
    let newStartValue = start;
    if (start < 0) {
        newStartValue = arr.length - Math.abs(start);
    }
    const LoopEnd = arr.length;
    const removedItemsList: T[] = [];
    const keptItemsList: T[] = [];

    for(let i = 0; i<LoopEnd; i++){
        if (i < newStartValue) {
            keptItemsList.push(arr.shift());
        }
        if (i == newStartValue) {
            keptItemsList.push(...items);
        }
        if (i >= newStartValue && i < newStartValue + deleteCount){
            removedItemsList.push(arr.shift());
        }
        if (i >= newStartValue + deleteCount) {
            keptItemsList.push(arr.shift());
        }
    }
    for (let i = 0; i<keptItemsList.length; i++){
        arr.push(keptItemsList[i])
    }
    return removedItemsList;
}