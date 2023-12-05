import {Sequelize,DataTypes} from 'sequelize';
import 'dotenv/config'


const sequelize = new Sequelize(process.env.PG_DB,process.env.PG_USER,process.env.PG_PASSWORD,
    {host:process.env.PG_HOST,dialect:"postgres",port:process.env.PG_PORT});
sequelize.authenticate().then(()=> console.log("CONNECTION TO DATABASE ESTABLISHED"))
.catch(error=>{
    console.log("COULDN'T CONNECT TO DATABASE. SOMETHING WENT WRONG.");
    console.log(error)
})

const ProfileSchema = sequelize.define('profile',{
  
    username:{
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    sex:{
        type: DataTypes.STRING(1),
        allowNull: false
    },
    company:{
        type:DataTypes.STRING(100)
    },
    position:{
        type:DataTypes.STRING(20)
    },
    city:{
        type:DataTypes.STRING,
        allowNull: false
    },
    account_type:{
        type: DataTypes.STRING(13),
        allowNull: false
    },
    img_url:{
        type:DataTypes.STRING,
        defaultValue: "default"
    },
    dob:{
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    userid:{
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false
    }
})
ProfileSchema.sync();
export default ProfileSchema;