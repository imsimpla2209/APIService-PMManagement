/* eslint-disable prettier/prettier */

export interface IBaseRepository<T>{

    lastId(): Promise<T | undefined>

    create(item: T): Promise<T | undefined> 

    update(item: T): Promise<T | undefined> 

    delete(id: string): Promise<boolean | undefined> 

    findAll(): Promise<T[] | undefined> 

    findById(id: string): Promise<T | undefined>  

    findByName(name: string): Promise<T | undefined>

}