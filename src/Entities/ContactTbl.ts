import { Entity, BaseEntity, PrimaryGeneratedColumn, Column , Generated } from "typeorm"

@Entity({ name: "Contact" })

export class Contact extends BaseEntity {
    @PrimaryGeneratedColumn({ name: "id" })
    @Generated('uuid')
    id: any

    @Column({ name: "name", type: "varchar", length: 70, default: null })
    name: any

    @Column({ name: "email", type: "varchar", length: 70, default: null })
    email: any

    @Column({ name: "message", type: "text", default: null })
    message: any

    @Column({ name: "contact", type: "varchar", length: 15, default: null })
    contact: any

    @Column({ name: "createdAt", type: "timestamptz" ,default:()=>'CURRENT_TIMESTAMP'})
createdAt: any

@Column({ name: "updatedAt", type: "timestamptz" ,default:()=>'CURRENT_TIMESTAMP'})
updatedAt: any

}