class AddUserForm extends Component {
    state = {  } 

    userExists = (firstName, lastName, users) =>{
        return (users.find(
            (user) =>
              user.firstName.toLowerCase() === firstName.toLowerCase() &&
              user.lastName.toLowerCase() === lastName.toLowerCase()
          ));
    }

    displayErrorMessage = ({message, title})=>{
        const error = (
            <Alert severity="error">
              <AlertTitle>{title}</AlertTitle>
              {message}
            </Alert>
          );
          this.setState({
            errors: error,
          });
          setTimeout(() => {
            this.setState({ errors: null });
          }, 4000);
    }

    createUser = (firstName, lastName, position ) =>{
        /*Commits user to the database and displays message*/
        const { postReq , notifyUser} = this.props;
        let rawResponse = postReq("/add_user", {
          first_name: firstName.toLowerCase(),
          last_name: lastName.toLowerCase(),
          position: position.toLowerCase(),
        });
          rawResponse.then((data) =>
            data.json().then((response) => {
              const severity = response.success ? "success" : "error";
              const title = severity.charAt(0) + severity.slice(1);
              notifyUser({
                content: response.message
                  ? response.message
                  : "User successfully added!",
                title: title,
                severity: severity,
              });
            })
          );
    }

    handlesubmitUser = (e) => {
        e.preventDefault();
        const { firstName, lastName, position } = this.state;
        const { users} = this.props;

        if (this.userExists(firstName, lastName, users)) {
          this.displayErrorMessage({title : 'Name Error', message : 'User With That Name Already Exists'})
        } else {
            this.createUser(firstName, lastName, position);
        }
      };

      
    render() { 
        return (
            <form>

            </form>
        );
    }
}
 
export default AddUserForm;