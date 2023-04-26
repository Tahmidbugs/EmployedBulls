import React from 'react';
import { Link } from 'react-router-dom';




function ExploreCompanies() {
  return (
    <div>
        <Link to="/studentdashboard">
  <button style={{ 
    backgroundColor: '#FF2400',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',
    transition: 'transform 0.2s ease-in-out',
    cursor: 'pointer',
    }} 
    onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
  >
    Go back to Dashboard
  </button>
</Link>


      <h1 style={{ textAlign: 'center', margin: '50px 0' }}>Explore Companies</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px' }}>
        <div style={{ width: '30%', marginRight: '50px' }}>
          <img src="https://th.bing.com/th/id/R.cc0b3e5ccdb2c298f7ccd4daae41ee7a?rik=A9lOYVQonxMzhg&pid=ImgRaw&r=0" alt="Company logo" style={{ width: '100%' }} />
        </div>
        <div style={{ width: '70%' }}>
          <h2 style={{ margin: '0' }}>UPS</h2>
          {/* I want to turn the font of the bio mission statement and core values into something more easy to read use verdana */}
          <p style={{ marginBottom: '10px', fontFamily: 'Verdana' }}>Bio: Founded in 1907, United Parcel Service (UPS) is a global logistics and delivery company headquartered in Sandy Springs, Georgia, USA. With a vast network of over 500,000 employees, UPS is one of the world's largest package delivery companies, offering a range of services such as logistics, transportation, and e-commerce solutions to more than 220 countries and territories worldwide. The company is dedicated to innovation and sustainability, constantly working to improve its operational efficiency and reduce its carbon footprint. With its commitment to customer satisfaction, UPS continues to be a trusted partner for businesses and individuals around the world. </p>
          <p style={{ marginBottom: '10px', fontFamily: 'Verdana' }}>Mission Statement: At UPS, we strive to be the world's leading logistics and transportation solutions company. Our mission is to provide excellent customer service while delivering innovative and sustainable solutions that connect people and businesses across the globe. </p>
          <p style={{ marginBottom: '10px', fontFamily: 'Verdana' }}>Core Values: Integrity: We are honest, ethical, and trustworthy in all our interactions with customers, colleagues, and partners.
Teamwork: We work collaboratively to achieve our goals, valuing diverse perspectives and respecting one another.
Service: We are committed to delivering exceptional customer service, going above and beyond to meet our customers' needs.
Quality: We strive for excellence in everything we do, from the services we provide to the relationships we build.
Safety: We prioritize safety in all our operations, ensuring the well-being of our employees, customers, and communities. </p>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px' }}>
        <div style={{ width: '30%', marginRight: '50px' }}>
          <img src="https://1000logos.net/wp-content/uploads/2020/05/Logo1-Estee-Lauder.jpg" alt="Company logo" style={{ width: '100%' }} />
        </div>
        <div style={{ width: '70%' }}>
          <h2 style={{ margin: '0' }}>Estee Lauder</h2>
          <p style={{ marginBottom: '10px', fontFamily: 'Verdana' }}>Bio: Estée Lauder Companies is a global beauty and health company founded in 1946 by Estée Lauder and her husband Joseph. The company offers a diverse range of skincare, makeup, fragrance, and hair care products, sold under brand names such as Estée Lauder, Clinique, MAC, Bobbi Brown, La Mer, and Aveda. Estée Lauder Companies operates in over 150 countries and territories worldwide, and is committed to using sustainable practices and ingredients to enhance the well-being of its customers and the planet. </p>
          <p style={{ marginBottom: '10px', fontFamily: 'Verdana' }}>Mission Statement: At Estée Lauder Companies, our mission is to enhance the well-being of our customers, employees, and communities by providing high-quality, innovative beauty and health products that inspire confidence and self-expression. We are dedicated to delivering exceptional customer service, fostering a diverse and inclusive workplace culture, and investing in sustainable practices that reduce our environmental impact. </p>
          <p style={{ marginBottom: '10px', fontFamily: 'Verdana' }}>Core Values: Quality: We are committed to using only the finest ingredients and technologies to create products that meet the highest standards of quality, safety, and effectiveness.
Innovation: We embrace innovation and creativity to develop new products and solutions that meet the evolving needs of our customers and the industry.
Integrity: We conduct ourselves with the highest levels of honesty, transparency, and ethical behavior, and we are accountable for our actions and decisions.
Diversity and Inclusion: We embrace diversity and inclusivity in all aspects of our business, from the products we create to the people we hire and the communities we serve.
Sustainability: We are committed to using sustainable practices and ingredients to minimize our environmental impact and contribute to the health and well-being of our planet and its people. </p>
          </div>
</div>
</div>
);
}

export default ExploreCompanies;