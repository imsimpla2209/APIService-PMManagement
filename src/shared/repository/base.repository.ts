// /* eslint-disable prettier/prettier */
// import { IBaseRepository } from "src/common/interfaces/base-interface.repository";
// import { Repository } from "typeorm";

 
// export class BaseRepository<T> extends Repository<T> implements IBaseRepository<T>  {
    

//     public async lastId() {
//         try {
//             const lastItem: T = await this.model.findOne().sort({ id: -1 });
//             console.log(lastItem)
//             if (lastItem) return lastItem.id;
//             return 0;
//         } catch (error) {
//             logger.error(error)
//         }
//     }

//     public async create(item: T): Promise<T> {
//         const id = await this.lastId() + 1;
//         let newItem = new this.model({
//             _id: Types.ObjectId(),
//             ...item,
//             id,
//         })
//         try {
//             await newItem.save();
//             return await this.findById(id);
//         } catch (error) {
//             logger.error(error)
//         }
//     }

//     public async update(item: T): Promise<T> {
//         try {
//             await this.model.updateOne({ id: item.id }, item);
//             return await this.findById(item.id);
//         } catch (error) {
//             logger.error(error)
//         }
//     }

//     public async delete(id: number): Promise<boolean> {
//         try {
//             await this.model.deleteOne({ id: id });
//             return true;
//         } catch (error) {
//             logger.error(error);
//         }
//     }

//     public async findAll(): Promise<T[]> {
//         try {
//             return await this.model.find();
//         } catch (error) {
//             logger.error(error)
//         }
//     }

//     public async findById(id: number): Promise<T> {
//         try {
//             return await this.model.findOne({ id: id });
//         } catch (error) {
//             console.log(error);
//             logger.error(error);
//         }
//     }

//     public async findByName(name: string): Promise<T> {
//         try {
//             return await this.model.findOne({ name });
//         } catch (error) {
//             logger.error(error);
//         }
//     }

// }