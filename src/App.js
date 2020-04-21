import React, { useEffect, useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedOption } from './actions/actionCreators';
import { Layout, Select, Modal } from 'antd';
import { options } from './constants';
import 'antd/dist/antd.css';
import './App.css';

const { Content } = Layout;
const { Option } = Select;

let timer = null;

const App = memo(() => {
	const dispatch = useDispatch();
	const [showModal, setShowModal] = useState(false);
	const selectedOption = useSelector((state) => state.dropDown.selectedOption);

	const onChange = (value) => {
		dispatch(setSelectedOption(value));
	};

	const handleClose = () => {
		setShowModal(false);
	};

	const onSearch = () => {
		if (timer) clearTimeout(timer);
	};

	useEffect(() => {
		if (!selectedOption) return;

		if (timer) {
			clearTimeout(timer);
		}

		timer = setTimeout(() => {
			setShowModal(true);
		}, 5000);

		return () => {
			clearTimeout(timer)
		};

	}, [selectedOption]);

	return (
		<Layout>
			<Content>
				<Select
					showSearch
					style={{ width: 200 }}
					placeholder="Select a person"
					optionFilterProp="children"
					onSearch={onSearch}
					onChange={onChange}
				>
					{options.map((option) => <Option key={option.value} value={option.value}>{option.label}</Option>)}
				</Select>
				<Modal
					title="Show Selected Option"
					visible={showModal}
					onCancel={handleClose}
					footer={false}
				>
					<p>{selectedOption}</p>
				</Modal>
			</Content>
		</Layout>
	);
});

export default App;
