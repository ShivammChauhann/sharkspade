import React, { useState } from "react";
import logo from "../assests/my image.jpeg";
import add from "../assests/992651.png";
import { AiOutlineEdit } from "react-icons/ai";
import { AiFillFileAdd } from "react-icons/ai";
import { useLocation, useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {ImCross} from "react-icons/im"
import ImageUploadPopup from "./ImageUploadPopup"; // Import the pop-up component
import { Link } from "react-router-dom";
import { addfollower, fetchexp, fetctPro, getdata, setExperience, setaboutdata, setform1p, setproject } from "../redux/features/AuthSlice";
import { uploadImage } from "../redux/features/ImageThunk";
import { fetchpost } from "../redux/features/PostSlice";
import { toast } from "react-toastify";
const ProfileOthers = ({ Route }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading , setloading] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isPopupOpen1, setPopupOpen1] = useState(false);
  const [isPopupOpen2, setPopupOpen2] = useState(false);
  const [isPopupOpen3, setPopupOpen3] = useState(false);
  const [my, setmy] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const location = useLocation();
  const handlenavigate1 = () => {
    setPopupOpen(true);
  };
  const handlenavigate2 = () => {
    window.scrollTo(0, 0); 
    setPopupOpen1(true);
  };
  const { id } = useParams();
  const _id = id;
  // console.log(_id);
  const handlenavigate3 = () => {
    window.scrollTo(0, 0);
    setPopupOpen2(true);
  };
  const handlenavigate4 = () => {
    window.scrollTo(0, 0); 
    setPopupOpen3(true);
  };
  const { isAuthenticated } = useSelector((state) => ({ ...state.auth }));
  const { user } = useSelector((state) => ({ ...state?.auth?.data?.data }));
  const { result } = useSelector((state) => ({ ...state?.auth?.profile?.data }));
  // console.log(result);
  useEffect(()=>{
    // console.log("hii")
    if(result?.select == 'company'){
      navigate(`/profilecomany/${id}`)
    }
  },[result])
  const { exp } = useSelector((state) => ({ ...state?.auth }));
  const { post } = useSelector((state) => ({ ...state?.Post }));
  const { Pro } = useSelector((state) => ({ ...state?.auth }));
  const image = useSelector((state) => state?.auth?.image);
  // console.log(image);/
  // console.log(user);
  // console.log();
  // console.log(Pro);
  // console.log(isAuthenticated);
  useEffect(() => {
    if (isAuthenticated == false) {
      navigate("/login");
    }
  }, []);
  // console.log(result?._id);
  // console.log(_id);
  useEffect(()=>{
    if (_id == user?._id) {
      setmy(true);
    }
    else{
      setmy(false)
    }
  },[_id])
  const filteredPosts = post?.filter((post) => post.id === _id);
  // const _id = user?._id;
  useEffect(() => {
    dispatch(fetchpost());
  }, []);
  useEffect(() => {
    // console.log(_id);
    dispatch(getdata(_id));
    dispatch(fetchexp(_id));
    dispatch(fetctPro(_id));
  }, [_id]);

  const handleEditPro = () => {
    navigate("/ProEdit");
  };

  const handleImage = () => {
    setImagePopupOpen(true);
  };
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const handleImageUpload = (newImageFile) => {
    // Handle the image upload logic here
    // Dispatch an action or perform other necessary actions
    setImageFile(newImageFile);
    // Close the pop-up after successful upload
    setImagePopupOpen(false);
  };

  const upload = () => {
    if (imageFile) {
      dispatch(uploadImage(imageFile, navigate));
    }
  };
  const handleImagePopupClose = () => {
    setImagePopupOpen(false);
  };
  const handlenavigatehome = () => {
    navigate("/");
  };
  const handlepostperson = (id) => {
    navigate(`/personalpost/${id}`);
  };

  const data = {
    id:user?._id,
    rid:_id
  }

  const [send,setsend] = useState(false)

  const followNow = () =>{
    dispatch(addfollower(data));
    setsend(true);
  }

  // ---------------------------------------------
  const [form1,setform1]=useState({
    firstname: result?.FirstName || "",
    lastname: result?.lastname || "",
    headline: result?.headline || "",
    Education: result?.Education || "",
    Country: result?.Country || "",
    id: result?._id || "",
    City: result?.City || "",
    CurrentPos: result?.CurrentPos || ""
  })
  
  useEffect(()=>{
    if(result?.FirstName != ''){
      setform1({
        firstname: result?.FirstName,
        lastname: result?.lastname ,
        headline: result?.headline,
        Education: result?.Education,
        Country: result?.Country ,
        id: result?._id ,
        City: result?.City ,
        CurrentPos: result?.CurrentPos 
      })
    }
  },[result])

  const handlechange = (e) =>{
    setform1({ ...form1, [e.target.name]: e.target.value });
  }

  // console.log(form1);

  useEffect(()=>{
    const id = form1?.id;
    dispatch(getdata(id));
  },[])
  const CustomToast = ({ message }) => (
    <div style={{ backgroundColor: '#333', color: '#fff', padding: '10px' }}>
      {message}
    </div>
  );

  // const sendataa = (form1) =>{
  //   if(form1.id == '' || form1.id == undefined ){
  //     setform1({
  //       ...form1,
  //       id: result?._id || user?._id
  //     });
  //     sendataa(form1);
  //   }
  //   else{
  //     dispatch(setform1p({form1,navigate})).then(()=>{
  //       setPopupOpen(false);
  //       window.location.reload();
  //     }).catch((error)=>{
  //       console.log(error)
  //     })
  //   }
  // }  
  const sendataa = async (form1) => {
    while (form1.id === '' || form1.id === undefined) {
      setform1({
        ...form1,
        id: result?._id || '',
      });
      // Wait a bit to avoid blocking the loop
      await new Promise((resolve) => setTimeout(resolve, 100)); // Adjust the delay as needed
    }
    
    try {
      dispatch(setform1p({form1,navigate})).then(()=>{
        setPopupOpen(false);
        window.location.reload();
      }).catch((error)=>{
        console.log(error)
      })
    } catch (error) {
      console.log(error);
    }
  };

  const handlesubmit = async () =>{
    // console.log("HII");
    if(form1.firstname == '' || form1.lastname == '' || form1.headline == '' || form1.City == '' || form1.Country == "" || form1.Education == ''){
      toast(<CustomToast message="Please fill the details" />, {
        position: "top-center",
      });
      return;
    } 
    if(form1.id == '' || form1.id == undefined ){
      setform1({
        ...form1,
        id: result?._id || user?._id
      });
    }
    await sendataa(form1);
  }

  // useEffect(()=>{
  //   if(form1.id != '' || form1.id != undefined){
  //     dispatch(setform1p({form1,navigate})).then(()=>{
  //       setPopupOpen(false);
  //       window.location.reload();
  //     }).catch((error)=>{
  //       console.log(error)
  //     })
  //   }
  // },[form1?.id != ''])
  // -------------------------------------------

  const [adata,setadata] = useState({
    textarea:result?.About||"",
    id:result?._id ||""
  })

  useEffect(()=>{
    if(result?.About != ''){
      setadata({
        textarea:result?.About,
        id:result?._id 
      })
    }
  },[result])

  const handlechange01 = (e) =>{
    // e.preventDefault();
    setadata({...adata,[e.target.name]:e.target.value});
  }  
  // console.log(adata);

  const sendaboutdata = async (adata) => {
    while (adata.id === '' || adata.id === undefined) {
      setadata({
        ...adata,
        id: result?._id || '',
      });
      // Wait a bit to avoid blocking the loop
      await new Promise((resolve) => setTimeout(resolve, 100)); // Adjust the delay as needed
    }
    
    try {
      await dispatch(setaboutdata({ adata, navigate }));
      setPopupOpen1(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const savedata = async (e) =>{
    e.preventDefault();
    if(adata.id == '' || adata.id == undefined ){
      setadata({
        ...adata,
        id: result?._id || ''
      });
    }
    // console.log(adata);
    // await console.log("Hii");

    await sendaboutdata(adata);
  }

  // ------------------------------------------------------------

  const [Edata,setEdata] = useState({
    title:"",
    type:"Full Time",
    Company:'',
    Location:'',
    Ltype:"On-Site",
    startdate:'',
    enddate:'',
    id:user?._id
  })

  const handlechange1  = (e) =>{
    setEdata({...Edata,[e.target.name]:e.target.value})
  }

  const handleTypeChange = (event) => {
    const selectedType = event.target.value;
    setEdata((prevData) => ({
      ...prevData,
      type: selectedType,  // Update the 'type' field with the selected value
    }));
  };

  const handleTypeChange1 = (event) => {
    const selectedType = event.target.value;
    setEdata((prevData) => ({
      ...prevData,
      Ltype: selectedType,  // Update the 'type' field with the selected value
    }));
  };

  // console.log(Edata);

  const savedata1 = (e) =>{
    e.preventDefault();
    if(Edata?.title == '' || Edata?.Ltype == "" || Edata?.Company == "" || Edata?.Location == '' || Edata?.Ltype == "" || Edata?.startdate == "" || Edata?.id == ""){
      toast(<CustomToast message="Please fill the details "/>, {
        position: "top-center",
      });
      return;
    }
    dispatch(setExperience({Edata,navigate})).then(()=>{
      setPopupOpen2(false);
      window.location.reload();
    }).catch((error)=>{
      console.log(error)
    })
  }
  //----------------------------------------------------- 
  const [pdata,setpdata] = useState({
    ProjectName:"",
    AboutP:"",
    ProjectLink:"",
    id:user?._id,
    startdate:'',
    enddate:''
  })


  const handlechange2 = (e) =>{
    setpdata({...pdata,[e.target.name]:e.target.value})
  }

  // console.log(pdata);

  const save = (e)=>{
    e.preventDefault();
    if(pdata?.ProjectName == '' || pdata?.AboutP == "" || pdata?.ProjectLink == "" || pdata?.id == '' || pdata?.startdate == '' ||pdata?.enddate == ''){
      toast(<CustomToast message="Please fill the details "/>, {
        position: "top-center",
      });
      return;
    }
    dispatch(setproject({pdata,navigate})).then(()=>{
      setPopupOpen3(false);
      window.location.reload();
    }).catch((error)=>{
      console.log(error)
    })
  }
  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
  
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
  
    return `${month} ${year}`;
  };
  return (
    <>
    <div className="w-7/12 ml-40  flex flex-col pt-16 font-serif wprofile" >
        <>
          <ImageUploadPopup
            isOpen={isImagePopupOpen}
            onClose={handleImagePopupClose}
            onImageUpload={handleImageUpload}
          />
          <div className="hei w-full rounded-xl bg-white">
            <div className="hdd w-full rounded-t">
              {/* <div className='h-40 top-32 left-10 w-40 rounded-full border-solid border-2 imgp  relative'>
    </div> */}
              <div className="h-40 top-32 left-10 w-40 rounded-full border-solid border-2 imgp1  relative">
                {result?.image != null ? (
                  <img
                    src={result?.image}
                    className="cursor-pointer imagge"
                    alt=""
                    // onClick={handleImage}
                  />
                ) : (
                  <img
                    src={add}
                    className="h-20 cursor-pointer imagge"
                    alt=""
                    // onClick={handleImage}
                  />
                )}
                {/* <input type="file"  className='h-20 cursor-pointer imagge' accept="image/*" onChange={handleImageUpload} /> */}
              </div>
            </div>
            {result?.headline != undefined ? (
              <div className="h-2/4 w-full flex p1res">
                <div className="h-full w-3/5 pt-14 pl-10 wdp">
                  <h1 className="text-2xl font-semibold mt-2">
                    {result?.FirstName ? result.FirstName : ""}{" "}
                    {result?.lastname ? result.lastname : ""}
                  </h1>
                  <p className="mt-1 wdd">{result?.headline ? result?.headline : ""}</p>
                  <h2 className="mt-1 text-gray-500">
                    {result?.City ? result?.City : ""},
                    {result?.Country ? result?.Country : ""}
                  </h2>
                  <p className="">
                  {
                      (result?.followers?.length > 500)
                      ?
                      <>
                      500+ connections
                      </>
                      :
                      <>
                      {result?.followers?.length} connections
                      </>
                    }
                  </p>
                    {
                  user?.following?.includes(id)?
                  <button disabled className="h-10 w-24 rounded-2xl mt-2 text-white bg-blue-600" >  
                  Following
                </button>
                  :
                  <button className="h-10 w-24 rounded-2xl mt-2 text-white bg-blue-600" onClick={followNow}>  
                    Connect
                  </button>
                  }
                </div>
                {/* <AiOutlineEdit
                  className="absolute top-30 edit"
                  onClick={handlenavigate1}
                /> */}
                <div className="h-full hiddenr w-96 p-5 mt-10">
                  <div className="h-20 w-80 flex justify-between items-center">
                    {/* <img classNam e="h-14 w-16" src={logo} alt="" /> */}
                    <h2 className="h-16 w-80 tracking-wide ml-2 mt-4 text-base uppercase underline">
                      {result?.Education ? result?.Education : ""}
                    </h2>
                  </div>
                  <div className="h-20 w-80 flex justify-between items-center">
                    {/* <img className="h-14 w-16" src={logo} alt="" /> */}
                    <h2 className="h-16 w-80 tracking-wide ml-2 mt-4 text-base uppercase underline">
                      {result?.CurrentPos ? result?.CurrentPos : ""}
                    </h2>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-2/4 w-full  flex items-center justify-center">
                <button
                  className="h-10 w-40 rounded-2xl mt-2 hover:bg-slate-300 text-black border-2 border-black"
                  // onClick={handlenavigate1}
                >
                  Add Your details
                </button>
              </div>
            )}
          </div>

          {result?.About != undefined ? (
            <div className="h-44 w-full mt-5 pt-6 pl-10 bg-white ares">
              {/* <AiOutlineEdit
                className="absolute top-29 right-4 edit"
                onClick={handlenavigate2}
              /> */}
              <h1 className="text-2xl font-medium ">About me</h1>
              <p className="mt-3">{result.About ? result.About : ""}</p>
            </div>
          ) : (
            <div className="h-40 w-full mt-5 pt-6  bg-white ">
              <h1 className="text-2xl font-medium pl-10">About me</h1>
              <div className="flex items-center justify-center">
                {/* <button
                  className="h-10 w-44 rounded-2xl mt-2 hover:bg-slate-300 text-black border-2 border-black"
                  // onClick={handlenavigate2}
                > */}
                  {/* Write about Yourself */}
                  <h1 className="text-md">No Content</h1>
                {/* </button> */}
              </div>
            </div>
          )}
          {post ? (
            <div className=" mt-5 w-full bg-white">
              <div className="flex presh justify-between items-center pl-10 pr-3 w-full h-20 ">
                <div className="">
                  <h1 className="text-2xl font-medium">Activity</h1>
                  <h2>{result?.followers?.length} followers</h2>
                </div>
                <div className="w-40 flex items-center justify-center">

                </div>
              </div>
              {filteredPosts?.map((item, index) => {
                return (
                  <>
                    <div className="pres h-36 ml-10 w-full mt-4 " key={index}>
                      <h1 className="text-slate-500">
                        {item?.name} posted this
                      </h1>
                      <div className="h-full flex mt-2">
                        {item.type == "image" ? (
                          <img
                            src={item?.PostVim}
                            className="h-14 w-20 mr-4 mt-4"
                            alt=""
                          />
                        ) : (
                          <div className="vmp">
                            <video
                              src={item?.PostVim}
                              className="h-24 w-20 mr-4"
                            />
                          </div>
                        )}
                        <div className="w-9/12 ">
                          <h1>#connections</h1>
                          <p>{item?.text}</p>
                        </div>
                      </div>
                    </div>
                    <ul className="w-10/12 ml-10  bg-slate-200"></ul>
                  </>
                );
              })}
              <div
                className="h-8 w-full flex items-center justify-center bg-slate-300 cursor-pointer"
                onClick={() => handlepostperson(_id)}
              >
                <h1>See All Posts</h1>
              </div>
            </div>
          ) : (
            <div className=" mt-5 w-full bg-white">
              <div className="flex justify-between items-center pl-10 pr-3 w-full h-20 ">
                <div className="">
                  <h1 className="text-2xl font-medium">Activity</h1>
                  <h2>871 Followers</h2>
                </div>
              </div>
              <h1 className="text-xl font-medium text-center mb-2">
                No Post Yet !..
              </h1>
            </div>
          )}
          {/* <div className=' mt-5 w-full bg-white'>
    <div className='flex justify-between items-center pl-10 pr-3 w-full h-20 '>
      <div className=''>
      <h1 className='text-2xl font-medium'>Activity</h1>
      <h2>871 Followers</h2>
      </div>
      <div className='w-40 flex items-center justify-center'>
        <button className='text-xl border-2 border-blue-300 h-10 mr-3 rounded-md text-blue-400 w-40'>Create a post</button>
      </div>
    </div>
    <div className='h-36 ml-10 w-full mt-4'>
    <h1 className='text-slate-500'>Nipun khatri posted this. 5 mon</h1>
    <div className='h-full flex mt-2'>
      <img src={logo} className='h-20 w-20 mr-4' alt="" />
      <div className='w-96 '>
        <h1>#connections</h1>
        <p>I am Glad to share you that our Team Org has once more trilled
out to next Level!..</p>
      </div>
    </div>
    </div>
    <ul className='w-10/12 ml-10 h-1 bg-slate-200'></ul>
    <div className='h-36 ml-10 w-full mt-4'>
    <h1 className='text-slate-500'>Nipun khatri posted this. 5 mon</h1>
    <div className='h-full flex mt-2'>
      <img src={logo} className='h-20 w-20 mr-4' alt="" />
      <div className='w-96 '>
        <h1>#connections</h1>
        <p>I am Glad to share you that our Team Org has once more trilled
out to next Level!..</p>
      </div>
    </div>
    </div>
    <ul className='w-10/12 ml-10 h-1 bg-slate-200'></ul>
    <div className='h-36 ml-10 w-full mt-4'>
    <h1 className='text-slate-500'>Nipun khatri posted this. 5 mon</h1>
    <div className='h-full flex mt-2'>
      <img src={logo} className='h-20 w-20 mr-4' alt="" />
      <div className='w-96 '>
        <h1>#connections</h1>
        <p>I am Glad to share you that our Team Org has once more trilled
out to next Level!..</p>
      </div>
    </div>
    </div>
    <ul className='w-full  h-1 bg-slate-100'></ul>
    <button className='h-10 w-full '>See All Posts </button>
  </div> */}
          {exp?.length != 0 ? (
            <>
              <div className=" mt-5 w-full bg-white">
                <div className="h-30 w-full  flex">
                  <h1 className="Exresh text-2xl pl-9 pt-3 font-semibold">
                    Experience
                  </h1>
                  {/* <AiFillFileAdd
                    className="absolute top-30  edit1 mr-20"
                    onClick={handlenavigate3}
                  />
                  <AiOutlineEdit
                    className="absolute top-30 edit"
                    onClick={handleeditexp}
                  /> */}
                </div>
                {exp?.map((item, index) => {
                  return (
                    <>
                      <div className="mb-5 w-full flex pl-9 Exres pt-4">
                        <img src={item?.image?item?.image:logo} className="h-20 w-20 mr-4" alt="" />
                        <div>
                          <h1 className="text-lg font-medium">{item.title}</h1>
                          <h3>
                            {item.Company} · {item.type}
                          </h3>
                          <h4 className="text-slate-400 text-sm">
                          {formatDate(item.startdate)} till {(item.enddate== "Present")? "Present": formatDate(item.enddate)}
                          </h4>
                        </div>
                      </div>
                      <ul className="w-10/12 ml-10 h-1 bg-slate-100"></ul>
                      {/* <div className='mb-5 w-full flex pl-9 pt-4'>
    <img src={logo} className='h-20 w-20 mr-4' alt="" />
    <div>
      <h1 className='text-lg font-medium'>Web Developer</h1>
      <h3>Microsoft Mobile Innovation Lab · Part-time</h3>
      <h4 className='text-slate-400 text-sm'>Apr 2022 - Present · 1 yr 4 mos</h4>
    </div>
  </div>
  <ul className='w-10/12 ml-10 h-1 bg-slate-100'></ul>
  <div className='mb-5 w-full flex pl-9 pt-4'>
    <img src={logo} className='h-20 w-20 mr-4' alt="" />
    <div>
      <h1 className='text-lg font-medium'>Web Developer</h1>
      <h3>Microsoft Mobile Innovation Lab · Part-time</h3>
      <h4 className='text-slate-400 text-sm'>Apr 2022 - Present · 1 yr 4 mos</h4>
    </div>
  </div> */}
                    </>
                  );
                })}
              </div>
            </>
          ) : (
            <div className=" mt-5 w-full bg-white">
              <div className="h-30 w-full  flex">
                <h1 className="text-2xl pl-9 pt-3 font-semibold">Experience</h1>
              </div>
              <div className="flex justify-center items-center">
                <button
                  className="h-10 w-44 rounded-2xl mt-2 mb-2  text-black"
                  // onClick={handlenavigate3}
                >
                  No Experience Yet
                </button>
              </div>
            </div>
          )}
          {Pro?.length != 0 ? (
            <div className="mb-5 w-full mt-5 bg-white">
              <div className="flex items-center justify-between">
                <h1 className="prresh text-2xl pl-9 pt-4 font-semibold">Projects</h1>
                <div>
                  {/* <AiFillFileAdd
                    className="absolute top-30  edit1 mr-20"
                    onClick={handlenavigate4}
                  />
                  <AiOutlineEdit
                    className="absolute top-30 edit"
                    onClick={handleEditPro}
                  /> */}
                </div>
              </div>
              {Pro?.map((item, index) => {
                return (
                  <>
                    <div className="prres mb-5 w-full pl-9 pt-4">
                      <h1 className="text-xl font-medium">
                        {item.ProjectName}
                      </h1>
                      <h3 className="text-slate-400 mb-4">
                      {formatDate(item.startdate)} to {formatDate(item.enddate?item.enddate:"Present")}
                      </h3>
                      <button className="h-10 rounded-md mb-4 w-40 border-2 border-black">
                        <Link target="_blank" to={item.ProjectLink}>
                          Show Project
                        </Link>
                      </button>
                      <p className="text-md w-10/12">{item.AboutP}</p>
                    </div>
                    <ul className="w-10/12 ml-10 h-1 bg-slate-200"></ul>
                  </>
                );
              })}
            </div>
          ) : (
            <div className="mb-5 w-full mt-5 bg-white">
              <div className="h-30 w-full  flex">
                <h1 className="text-2xl pl-9 pt-3 font-semibold">Projects</h1>
              </div>
              <div className="flex justify-center items-center">
                <button
                  className="h-10 w-44 rounded-2xl mt-2 mb-2  text-black "
                  // onClick={handlenavigate4}
                >
                  No Project Yet
                </button>
              </div>
              {/* <h1 className='text-xl font-medium text-center mb-2'>Add a Project</h1> */}
            </div>
          )}
        </>
    </div>
    </>
  );
};

export default ProfileOthers;
