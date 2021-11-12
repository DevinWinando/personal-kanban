import React from "react";

function Card() {
  return (
    <div className="card bordered h-4/5 mt-10 ml-10">
      <div className="card-body">
        <h1 className="card-title">Task</h1>
        <hr className="mb-4" />
        <div class="collapse border rounded-box border-base-300 collapse-arrow">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">First Task</div>
          <div className="collapse-content">
            <p>Minim sint cillum dolore ad fugiat sunt est non eiusmod enim.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
