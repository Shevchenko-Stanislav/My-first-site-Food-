import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector, modalTimerId) {
    // Forms

    const forms = document.querySelectorAll(formSelector);
    
    const message = {
        loading: 'Загрузка...',
        succes: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Это учебный проект, он не отправляет данные'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    function bindPostData(form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const statusMessage = document.createElement('div');
            statusMessage.innerHTML = message.loading;
            statusMessage.style.cssText = `
                text-align: center;
                padding-top: 10px;
                font-size: 12px;
                width: 100px;
                height: 30px;
                display: block;
                margin: 0 auto;
            `;
            form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('URL', json)
            .then(data => {
                showThanksModal (message.succes);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
                statusMessage.remove();
            }).finally(() => {
                form.reset();
                statusMessage.remove();
            });
        });
    }
    
    function showThanksModal (message) {
        const modalDialog = document.querySelector('.modal__dialog');

        modalDialog.style.display = 'none';
        openModal('.modal', modalTimerId);

        const thaksModal = document.createElement('div');
        thaksModal.classList.add('modal__dialog');
        thaksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thaksModal);
        setTimeout(() => {
            thaksModal.remove();
            modalDialog.style.display = 'block';
            closeModal('.modal');
        }, 4000);
    }

}

export default forms;