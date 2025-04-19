import { Entity, BaseEntity, PrimaryGeneratedColumn, Column ,Generated } from "typeorm"

@Entity({ name: "AppointmentTblGen" })
export class AppointmentTblGen extends BaseEntity {
    @PrimaryGeneratedColumn({ name: "id" })
    @Generated('uuid')
    id: any

    @Column({ name: "patientId", type: "varchar", default: null })
    patientId: any

    @Column({ name: "departmentId", type: "varchar", default: null })
    departmentId: any

    @Column({ name: "doctorId", type: "varchar", default: null })
    doctorId: any

    @Column({ name: "gender", type: "varchar", default: null })
    gender: any

    @Column({ name: "contact", type: "varchar", default: null })
    contact: any

    @Column({ name: "disease", type: "text", default: null })
    disease: any

    @Column({ name: "daysFeel", type: "text", default: null })
    daysFeel: any   
    @Column({ name: "lastVisiting", type: "text", default: null })
    lastVisiting: any


    @Column({ name: "day", type: "varchar", default: null, })
    day: any
    
    @Column({ name: "time", type: "varchar", default: null, })
    time: any
    
    @Column({ name: "fees", type: "varchar", default: null, })
    fees: any

    @Column({ name: "payment", type: "varchar", default: null, })
    payment: any

    @Column({ name: "status", type: "varchar", length: 50, default: null })
    status: any

    @Column({ name: "appointmentType", type: "varchar", length: 50, default: null })
    appointmentType: any

    @Column({ name: "date", type: "date", default: null })
    date: any
    
    @Column({ name: "createdAt", type: "timestamptz" ,default:()=>'CURRENT_TIMESTAMP'})
    createdAt: any

    @Column({ name: "updatedAt", type: "timestamptz" ,default:()=>'CURRENT_TIMESTAMP'})
    updatedAt: any

}
