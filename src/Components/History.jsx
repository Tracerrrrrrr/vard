import React, { useEffect, useState } from 'react';
import { Table} from 'react-bootstrap';
import { ReactComponent as EyeIcon } from 'bootstrap-icons/icons/eye.svg';
import { ReactComponent as DownloadIcon } from 'bootstrap-icons/icons/download.svg';
import axios from 'axios';
import "./Spinner.css"
import './modal.css'; // Import CSS file for modal styles
import {REACT_API_URL} from "../Assets/ApiStarting"
import jsPDF from 'jspdf'

const History = () => {
//for viewModal useState
const[viewModalValues,setViewModalValues]=useState({})

  //for modal 

  const [showModal, setShowModal] = useState(false);

  const toggleModal = async (e) => {
    console.log("Toggle modal clicked"); // Add this line
    const getModalById = await axios.get(`${REACT_API_URL}/product/getInvoiceById/${e}`);
    setViewModalValues(getModalById.data);
    setShowModal(!showModal);
  };
  
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  // Sample data
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [currentItems, setCurrentItems] = useState([]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setCurrentItems(data.slice(startIndex, endIndex));
  }, [data, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  //mock api from json server
  //this useEffect will be called on page load

  useEffect(() => {
    // Fetch data from API
    fetchData(); // Call fetchData function
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${REACT_API_URL}/product/getInvoice`);
    //  console.log(response.data)
      setData(response.data); // Set the fetched data to state
      setIsLoaded(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return  <div className="spinner-container">
    <div className="spinner-border text-danger" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>;
  }
  const downloadPdf = () => {
    const pdf = new jsPDF();
  
    // Set font size to 10px
    pdf.setFontSize(8);
  
    const content = document.getElementById('modal-content');
  
    // Calculate the height of the content and adjust the PDF page size if necessary
    const contentHeight = content.clientHeight;
    const contentWidth = content.clientWidth;
    const pageHeight = pdf.internal.pageSize.height;
    const pageWidth = pdf.internal.pageSize.width;
  
    // Calculate scale factors for width and height
    const widthScale = pageWidth / contentWidth;
    const heightScale = pageHeight / contentHeight;
    const scale = Math.min(widthScale, heightScale); // Use the minimum scale to fit both dimensions
    content.style.height = `${contentHeight}px`; // Adjust the height as needed
    // Add HTML content to the PDF with scaling applied
    const downloadButton = document.querySelector('.download-button');
    const closeButton = document.querySelector('.close');
    if (downloadButton) {
      downloadButton.style.display = 'none';
    }
    if (closeButton) {
      closeButton.style.display = 'none';
    }
    pdf.html(content, {
      callback: () => {
        pdf.save('invoice.pdf');
        setShowModal(!showModal);
      },
      html2canvas: {
        scale: scale // Apply the calculated scale
      }
    });
  };
  return (
    <>
      {data.length === 0 ? (
        <div style={{display:'flex',justifyContent:'center',color:'red'}}>No Data Available</div>
      ) : (
        <>
          <div className="row mb-3">
            <div className="col-sm">
              <b><label>Filter By Date : </label></b>
              <input type="date" placeholder="Enter Date" />
            </div>
            <div className="col-sm">
              <b><label>Filter By Code No : </label></b>
              <input type="text" placeholder="Enter Code No" />
            </div>
          </div>
  
          <div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Sr No.</th>
                  <th>Date</th>
                  <th>Code No</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.date}</td>
                    <td>{item.code_no}</td>
                    <td>{item.total}</td>
                    <td><button className='btn btn-primary' onClick={() => toggleModal(item._id)}><EyeIcon /></button></td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <ul className="pagination">
              {Array.from({ length: totalPages }, (_, i) => (
                <li
                  key={i}
                  className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageClick(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
  
      {/* Modal written here on clicking on view */}
       {/* Modal written here on clicking on view */}
  {showModal && (
    <div className="modal">
      <div className="modal-content" id="modal-content">
        <div style={{display:'flex',justifyContent:"flex-end",marginRight:"2rem"}}>
        <button className='btn btn-danger download-button' style={{marginLeft:'1rem'}} onClick={downloadPdf}><DownloadIcon /></button>
        </div>
        <span className="close" onClick={toggleModal}>&times;</span>
        <div style={{display:'flex',justifyContent:"center"}}>
        <h5>Invoice</h5>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="row mb-3">
              <div className="col-sm">
                <b><label>Date : </label></b>
               <span style={{marginLeft:"0.5rem"}}>{viewModalValues.date}</span>
              </div>
              <div className="col-sm">
              <b><label>Code No : </label></b>
                <span style={{marginLeft:"0.5rem"}}>{viewModalValues.code_no}</span>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-sm">
              <b><label>Gross Weight : </label></b>
                <span style={{marginLeft:"0.5rem"}}>{viewModalValues.gross_weight}</span>
              </div>
              <div className="col-sm">
              <b><label>Less : Vax : </label></b>
                <span style={{marginLeft:"0.5rem"}}>{viewModalValues.less_vax}</span>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-sm">
              <b><label>Less: Mani-Moti : </label></b>
                <span style={{marginLeft:"0.5rem"}}>{viewModalValues.less_manimoti}</span>
              </div>
              <div className="col-sm">
              <b> <label>Less: Others / Sil-Victo : </label></b>
                <span style={{marginLeft:"0.5rem"}}>{viewModalValues.less_others_sil}</span>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-sm">
              <b> <label>Ghat Wt. : </label></b>
                <span style={{marginLeft:"0.5rem"}}>{viewModalValues.ghat_weight}</span>
              </div>
              <div className="col-sm">
              <b> <label>Kundan Wt. : </label></b>
                <span style={{marginLeft:"0.5rem"}}>{viewModalValues.kundan_weight}</span>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-sm">
              <b> <label>Net Weight : </label></b>
                <span style={{marginLeft:"0.5rem"}}>{viewModalValues.net_weight}</span>
              </div>
              <div className="col-sm">
              <b> <label>Pcs K. : </label></b>
                <span style={{marginLeft:"0.5rem"}}>{viewModalValues.pcs_k}</span>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-sm">
              <b> <label>Tak Pcx.x : </label></b>
                <span style={{marginLeft:"0.5rem"}}>{viewModalValues.tak_pcs}</span>
              </div>
              <div className="col-sm">
              <b> <label>Extra : </label></b>
                <span style={{marginLeft:"0.5rem"}}>{viewModalValues.extra}</span>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-sm">
              <b> <label>Sil-victo / Others : </label></b>
                <span style={{marginLeft:"0.5rem"}}>{viewModalValues.Sil_victo}</span>
              </div>
              <div className="col-sm">
              <b> <label>Total : </label></b>
                <span style={{marginLeft:"0.5rem"}}>{viewModalValues.total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )}
    </>
  );
}
export default History;
