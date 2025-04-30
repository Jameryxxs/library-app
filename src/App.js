import React from 'react';
import BookSearch from './components/BookSearch';


const App = () => {
  return (
    <div className="App">
      <header className="bg-gray-800 p-4 text-white text-center">
        <img src={require('./assets/logo.png')} alt="Logo" className="w-24 h-24 relative mx-auto" />
        <h1 className="text-3xl mt-2">Book Search App</h1>
      </header>
      <section className="banner">
        <img
          src={require('./assets/banner.jpg')}
          alt="Banner"
          className=" w-full h-100 object-cover mt-4"
        />
      </section>
      <main className="mt-8"> 
        <BookSearch />
      </main>
    </div>
  );
};

export default App;
