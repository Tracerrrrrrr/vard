import React,{useState,useEffect} from 'react';
import {REACT_API_URL} from "../Assets/ApiStarting"
import axios from 'axios'
const HomePage = () => {
//useState for errors
const[emptyError,setEmptyError]=useState({})
  //useState for posting data
  const[date,setDate]=useState("")
  const[codeNo,setCodeNo]=useState("")
  const[grossWeight,setGrossWeight]=useState("")
  const[lessWax,setLessWax]=useState("")
  const[lessManiMoti,setLessManiMoti]=useState("")
  const[lessOthers,setLessOthers]=useState("")
  const[ghatWeight,setGhatWeight]=useState("")
  const[kundanWeight,setKundanWeight]=useState("")
  const[netWeight,setNetWeight]=useState("")
  const[pcsK,setPcsK]=useState("")
  const[takPcsX,setTakPcsX]=useState("")
  const[extra,setExtra]=useState("")
  const[silVicto,setSilVicto]=useState("")
  const[total,setTotal]=useState("")
    const AddDatatoServer=async(e)=>{
        setEmptyError({})
e.preventDefault();

//validation logicss

let error=false;
if(date==""){
    setEmptyError((prevErrors) => ({
        ...prevErrors,
        errordate: "Please Select Date",
      }));
      error = true;
}
 if(codeNo==""){
    setEmptyError((prevErrors) => ({
        ...prevErrors,
        codeno: "Please Enter Code No",
      }));
      error = true;
}
if(grossWeight==""){
    setEmptyError((prevErrors) => ({
        ...prevErrors,
        grossweight:"Please Enter Gross Weight"
    }));
error=true
}
 if(lessWax==""){
    setEmptyError((prevErrors) => ({
        ...prevErrors,
        lesswax:"Please Enter Less Wax"
    }));
error=true
}
 if(lessManiMoti==""){
    setEmptyError((prevErrors) => ({
        ...prevErrors,
        lessmanimoti:"Please Enter Less Mani Moti"
    }))
error=true
}

if(lessOthers==""){
    setEmptyError((prevErrors) => ({
        ...prevErrors,
        lessothers:"Please Enter Less Others"
    }))
error=true
}
if(ghatWeight==""){
    setEmptyError((prevErrors) => ({
        ...prevErrors,
        ghatweight:"Please Enter Ghat Weight"
    }))
error=true
}
 if(kundanWeight==""){
    setEmptyError((prevErrors) => ({
        ...prevErrors,
        kundanweight:"Please Enter Kundan Weight"
    }))
error=true
}
if(netWeight==""){
    setEmptyError((prevErrors) => ({
        ...prevErrors,
        netweight:"Please Enter Net Weight"
    }))
error=true
}
 if(pcsK==""){
    setEmptyError((prevErrors) => ({
        ...prevErrors,
        pcsk:"Please Enter Pcs k"
    }))
error=true
}
if(takPcsX==""){
    setEmptyError((prevErrors) => ({
        ...prevErrors,
        takpcsx:"Please Enter Tak Pcs X"
    }))
error=true
}
if(extra==""){
    setEmptyError((prevErrors) => ({
        ...prevErrors,
       extras:"Please Enter Extra"
    }))
error=true
}
 if(silVicto==""){
    setEmptyError((prevErrors) => ({
        ...prevErrors,
        silvicto:"Please Enter Sil Victo"
    }))
error=true
}
if(total==""){
    setEmptyError((prevErrors) => ({
        ...prevErrors,
        totals:"Please Enter Total"
    }))
error=true
}
console.log(error)
if(!error){
const formdataforpost=new FormData()
formdataforpost.append("date",date)
formdataforpost.append("code_no",codeNo)
formdataforpost.append("gross_weight",grossWeight)
formdataforpost.append("less_vax",lessWax)
formdataforpost.append("less_manimoti",lessManiMoti)
formdataforpost.append("less_others_sil",lessOthers)
formdataforpost.append("ghat_weight",ghatWeight)
formdataforpost.append("kundan_weight",kundanWeight)
formdataforpost.append("net_weight",netWeight)
formdataforpost.append("pcs_k",pcsK)
formdataforpost.append("tak_pcs",takPcsX)
formdataforpost.append("extra",extra)
formdataforpost.append("Sil_victo",silVicto)
formdataforpost.append("total",total)
const postdata=await axios.post(`${REACT_API_URL}/product/addInvoice`,formdataforpost,{headers:{
    'Content-Type':'application/json'
  }})
if(postdata.data.message=="Created!"){
  window.alert("Invoice Added SuccessFully!")
  window.location.reload()
    
}
else {
  window.alert("Something Went Wrong!")
}
}

    }
  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-sm">
              <label>Date:</label>
              <input type="date" className="form-control form-control-sm" style={{ width: '80px' }} placeholder="YYYY-MM-DD" onChange={(e)=>setDate(e.target.value)}/>
              <p style={{color:"red"}}>{emptyError.errordate}</p>
            </div>
            <div className="col-sm">
              <label>Code No:</label>
              <input type="text" className="form-control" placeholder="Enter code number" onChange={(e)=>setCodeNo(e.target.value)} />
              <p style={{color:"red"}}>{emptyError.codeno}</p>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm">
              <label>Gross Weight</label>
              <input type="text" className="form-control" placeholder="Enter gross weight" onChange={(e)=>setGrossWeight(e.target.value)}/>
              <p style={{color:"red"}}>{emptyError.grossweight}</p>
            </div>
            <div className="col-sm">
              <label>Less : Vax</label>
              <input type="text" className="form-control" placeholder="Enter Vax" onChange={(e)=>setLessWax(e.target.value)}/>
              <p style={{color:"red"}}>{emptyError.lesswax}</p>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm">
              <label>Less: Mani-Moti</label>
              <input type="text" className="form-control" placeholder="Enter Mani-Moti" onChange={(e)=>setLessManiMoti(e.target.value)}/>
              <p style={{color:"red"}}>{emptyError.lessmanimoti}</p>
            </div>
            <div className="col-sm">
              <label>Less: Others / Sil-Victo</label>
              <input type="text" className="form-control" placeholder="Enter Others / Sil-Victo" onChange={(e)=>setLessOthers(e.target.value)}/>
              <p style={{color:"red"}}>{emptyError.lessothers}</p>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm">
              <label>Ghat Wt.</label>
              <input type="text" className="form-control" placeholder="Enter Ghat weight" onChange={(e)=>setGhatWeight(e.target.value)}/>
              <p style={{color:"red"}}>{emptyError.ghatweight}</p>
            </div>
            <div className="col-sm">
              <label>Kundan Wt.</label>
              <input type="text" className="form-control" placeholder="Enter Kundan weight" onChange={(e)=>setKundanWeight(e.target.value)}/>
              <p style={{color:"red"}}>{emptyError.kundanweight}</p>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm">
              <label>Net Weight</label>
              <input type="text" className="form-control" placeholder="Enter Net weight" onChange={(e)=>setNetWeight(e.target.value)}/>
              <p style={{color:"red"}}>{emptyError.netweight}</p>
            </div>
            <div className="col-sm">
              <label>Pcs K.</label>
              <input type="text" className="form-control" placeholder="Enter Pcs K" onChange={(e)=>setPcsK(e.target.value)}/>
              <p style={{color:"red"}}>{emptyError.pcsk}</p>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm">
              <label>Tak Pcx.x</label>
              <input type="text" className="form-control" placeholder="Enter Tak Pcx.x" onChange={(e)=>setTakPcsX(e.target.value)}/>
              <p style={{color:"red"}}>{emptyError.takpcsx}</p>
            </div>
            <div className="col-sm">
              <label>Extra</label>
              <input type="text" className="form-control" placeholder="Enter extra" onChange={(e)=>setExtra(e.target.value)}/>
              <p style={{color:"red"}}>{emptyError.extras}</p>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm">
              <label>Sil-victo / Others</label>
              <input type="text" className="form-control" placeholder="Enter Sil-victo / Others" onChange={(e)=>setSilVicto(e.target.value)}/>
              <p style={{color:"red"}}>{emptyError.silvicto}</p>
            </div>
            <div className="col-sm">
              <label>Total</label>
              <input type="text" className="form-control" placeholder="Enter total" onChange={(e)=>setTotal(e.target.value)}/>
              <p style={{color:"red"}}>{emptyError.totals}</p>
            </div>
          </div>
          <button className='btn btn-danger' onClick={AddDatatoServer}>Submit</button>
        </div>
      </div>
    </>
  );
};

export default HomePage;
