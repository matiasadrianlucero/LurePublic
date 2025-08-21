import axios from 'axios'
import getAdress from '../../../../getAdress'
export async function createPostJS(tags,resetFields,addPost,setAlertFunc){
  let formData=new FormData()
  let adress=getAdress()
  
  let tempString=""
  tags.map((content,i)=>{
    tempString= tempString+ " " +content
  })
  const files =document.getElementById("postImg").files;
  if(files.length == 0 && document.getElementById("postText").value == ""){
    return
  }
  if (files.length != 0) {
      for (const file of files) {
        formData.append('files',file)
        
      }
  }

  formData.append('text',document.getElementById("postText").value)
  formData.append('tags',tempString)
  try {
    let result=await axios.post(adress + '/upload/Post', 
      formData, 
    {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization':localStorage.getItem("token")

      }
      ,
      // withCredentials: true
    })
    if(result && result.data){
      addPost([result.data.postsList])
      resetFields()
      return
    }
  } catch (error) {
    setAlertFunc(error.response.data.validationErrors)     
  }

}
