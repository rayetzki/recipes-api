import { IsEnum } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "./user.interface";
import { RecipeEntity } from "../recipes/recipes.entity";
import { NutritionType } from "../recipes/recipes.interface";
import { FavouritesEntity } from "src/favourites/favourites.entity";
import { Exclude } from "class-transformer";

@Entity("users")
export class UserEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column({ type: "enum", enum: NutritionType, default: NutritionType.ANY })
    @IsEnum(NutritionType)
    nutrition: NutritionType

    @Column()
    age: number;

    @Column({ unique: true })
    email: string;

    @Column({ default: "https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Cat-512.png" })
    avatar: string;

    @Column({ select: false })
    password: string;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
    role: UserRole;

    @OneToMany(() => RecipeEntity, recipe => recipe.author, { onDelete: "CASCADE" })
    recipes: RecipeEntity[];

    @Exclude()
    @OneToMany(() => FavouritesEntity, favourites => favourites.user)
    favourites: FavouritesEntity[];
}