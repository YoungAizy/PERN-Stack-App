import {Sequelize,DataTypes} from 'sequelize';
const sequelize = new Sequelize();

const Profile = sequelize.define('Profile',{
    name:{
        type: DataTypes.STRING(40),
        allowNull: false
    },
    username:{
        type: DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true
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
    role:{
        type: DataTypes.STRING(8),
        allowNull: false
    },
    imgUrl:{
        type:DataTypes.STRING,
        defaultValue: "default"
    },
    DOB:{
        type: DataTypes.DATE,
        allowNull: false
    }
})

export default Profile;