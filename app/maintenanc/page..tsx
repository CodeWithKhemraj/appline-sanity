import { FaTools } from 'react-icons/fa';
  
const page = () => {
  return (
    <div className='w-screen h-screen flex justify-center content-center'>
      <FaTools size={60} color="gray" />
      <h1 style={{ marginTop: '20px' }}>🚧 Under Maintenance</h1>
      <p>We're currently upgrading our site. Please check back soon!</p>
    </div>
  )
}

export default page


