const Observation = ({ changeView, callback }) => <div className="observation">
    <h1>observações</h1>
    <textarea rows={20}></textarea>
    <div className="obs-buttons">
        <button onClick={() => changeView("menu")}>Fechar</button>
        <button onClick={() => callback(prev => ({ ...prev, observation: true }))}>Salvar</button>
    </div>
</div>;

export default Observation;