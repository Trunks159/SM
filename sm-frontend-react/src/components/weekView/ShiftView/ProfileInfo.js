import React, {Component} from "react";

class ProfileInfo extends Component {
    state = { 
        loading : true
     } 
    componentDidMount = ()=>{
        fetch(`/profile_info/${this.props.id}/${this.props.weekday}`)
        .then((response)=> response.json())
        .then(({firstName, lastName, availability, shifts})=>{
            this.setState({firstName : firstName, lastName :lastName,
                availability : availability, shifts : shifts, loading : false});
        });
        
    }
    render() { 
       if(this.state.loading){
           return <p>Loading</p>
       } 
       else{
            const {firstName, lastName, availability, shifts} = this.state; 
        return <div>
            <p>{firstName}</p>
            <p>{lastName}</p>
            <p>Availability : </p>
            {availability}
        </div>
       }
    }
}
 
export default ProfileInfo;