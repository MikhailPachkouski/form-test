document.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById('form');

	const inputName = document.getElementById('form_name');
	const inputEmail = document.getElementById('form_email');
	const inputPhone = document.getElementById('form_phone');
	const inputDate = document.getElementById('form_date');
	const inputArea = document.getElementById('form_message');
	const inputs = document.querySelectorAll('input');
	const fields = document.querySelectorAll('input, textarea');

	const postData = (url, data) => {
		return fetch(url, {
			method: 'POST',
			body: data,
		}).then(response => response.json());
	};

	const clearForm = () => {
		fields.forEach(input => {
			input.value = '';
		});
	};

	function sendForm(event) {
		event.preventDefault();

		const url = 'https://jsonplaceholder.typicode.com/posts';

		for (let el of form.elements) {
			if (el.value === '' && el.tagName !== 'BUTTON') {
				el.classList.add('error');
				el.nextElementSibling.textContent = 'Поле не может быть пустым';
			} else if (el.tagName !== 'BUTTON' && el.nextElementSibling.textContent !== '') {
				el.classList.remove('error');
			}
		}

		const values = {};

		let statusRequestMessage = document.createElement('div');
		statusRequestMessage.classList.add('status');
		form.appendChild(statusRequestMessage);

		if (checkName() && checkEmail() && checkPhone() && checkDate() && checkArea()) {
			fields.forEach(field => {
				const { name, value } = field;
				values[name] = value;
			});

			const formData = JSON.stringify(values);

			postData(url, formData)
				.then(data => {
					console.log(data);
					statusRequestMessage.textContent = 'Успешно!';
				})
				.catch(error => {
					console.log(error);
					statusRequestMessage.textContent = '!!!Ошибка!!!';
				})
				.finally(() => {
					clearForm();
					setTimeout(() => {
						statusRequestMessage.remove();
					}, 5000);
				});
		}
	}

	form.addEventListener('submit', sendForm);

	inputName.addEventListener('input', checkName);
	inputEmail.addEventListener('input', checkEmail);
	inputPhone.addEventListener('input', checkPhone);
	inputDate.addEventListener('input', checkDate);
	inputArea.addEventListener('input', checkArea);

	for (let el of form.elements) {
		if (el.tagName !== 'BUTTON') {
			el.addEventListener('focus', () => {
				el.nextElementSibling.textContent = '';
				el.classList.remove('error');
			});
		}
	}

	function checkName() {
		let nameVal = inputName.value;
		const regName = '^[a-zA-Z]{3,30}\\s[a-zA-Z]{3,30}$';
		const reg = new RegExp(regName);
		if (nameVal === '') {
			inputName.nextElementSibling.textContent = 'Поле не может быть пустым';
			return false;
		} else {
			if (!reg.test(nameVal)) {
				inputName.classList.add('error');
				inputName.nextElementSibling.textContent =
					'Только латинские буквы с одним пробелом между словами';
				return false;
			} else {
				inputName.classList.remove('error');
				inputName.nextElementSibling.textContent = '';
			}
		}
		return true;
	}

	function checkEmail() {
		let emailVal = inputEmail.value;
		const regEmail = '^[-\\w.]+@([A-z0-9]+\\.)+[A-z]{2,4}$';
		const reg = new RegExp(regEmail);
		if (emailVal === '') {
			inputEmail.nextElementSibling.textContent = 'Поле не может быть пустым';
			return false;
		} else {
			if (!reg.test(emailVal)) {
				inputEmail.classList.add('error');
				inputEmail.nextElementSibling.textContent = 'Неверный формат адреса';
				return false;
			} else {
				inputEmail.classList.remove('error');
				inputEmail.nextElementSibling.textContent = '';
			}
		}
		return true;
	}

	function checkPhone() {
		let phoneVal = inputPhone.value;
		const regPhone = '^((\\+7|7|8)+([0-9]){10})$';
		const reg = new RegExp(regPhone);
		if (phoneVal === '') {
			inputPhone.nextElementSibling.textContent = 'Поле не может быть пустым';
			return false;
		} else {
			if (!reg.test(phoneVal)) {
				inputPhone.classList.add('error');
				inputPhone.nextElementSibling.textContent = 'Неверный формат номера';
				return false;
			} else {
				inputPhone.classList.remove('error');
				inputPhone.nextElementSibling.textContent = '';
			}
		}
		return true;
	}

	function checkDate() {
		let dateVal = new Date(inputDate.value).toLocaleDateString();
		const curDate = new Date().toLocaleDateString();
		if (dateVal > curDate) {
			inputDate.classList.add('error');
			inputDate.nextElementSibling.textContent = 'Дата рождения не может быть из будущего';
			return false;
		} else {
			inputDate.classList.remove('error');
			inputDate.nextElementSibling.textContent = '';
		}
		return true;
	}

	function checkArea() {
		let areaVal = inputArea.value;
		if (areaVal.length < 10 || areaVal.length > 300) {
			inputArea.classList.add('error');
			inputArea.nextElementSibling.textContent = 'Не менее 10 символов';
			return false;
		} else {
			inputArea.classList.remove('error');
			inputArea.nextElementSibling.textContent = '';
		}
		return true;
	}
});
