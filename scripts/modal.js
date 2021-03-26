 const toggleModal = (modalText) => {
    document.querySelector('.modal p').textContent = modalText;

    document.querySelector('.modal').style.display = 'block';

    document.querySelector('.modal-btn').addEventListener('click', () => {
        document.querySelector('.modal').style.display = 'none';
    });
};

export default toggleModal;