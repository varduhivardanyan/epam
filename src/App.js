import React, { useEffect, useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedOptions } from './actions/actionCreators';
import { Layout, Select, Modal, PageHeader } from 'antd';
import { options } from './constants';
import 'antd/dist/antd.css';
import './App.css';

const { Content } = Layout;
const { Option } = Select;

let timer = null;

const App = memo(() => {
	const dispatch = useDispatch();
	const [showModal, setShowModal] = useState(false);
	const selectedOptions = useSelector((state) => state.dropDown.selectedOptions);

	const onChange = (value) => {
		dispatch(setSelectedOptions(value));
	};

	const handleClose = () => {
		setShowModal(false);
	};

	const onSearch = () => {
		if (timer) clearTimeout(timer);
	};

	useEffect(() => {
		if (!selectedOptions.length) return;

		if (timer) {
			clearTimeout(timer);
		}

		timer = setTimeout(() => setShowModal(true), 5000);

		return () => clearTimeout(timer);

	}, [selectedOptions.length]);

	return (
		<Layout>
			<PageHeader title="Select Box with Ant Design library"/>
			<Content>
				<Select
					mode="multiple"
					style={{ minWidth: '400px' }}
					showSearch
					placeholder="Select a person"
					optionFilterProp="children"
					onSearch={onSearch}
					onChange={onChange}
				>
					{options.map((option) => <Option key={option.value} value={option.value}>{option.label}</Option>)}
				</Select>
				<Modal
					title="Show Selected Options"
					visible={showModal}
					onCancel={handleClose}
					footer={false}
				>
					<p>{selectedOptions.join(' ')}</p>
				</Modal>
			</Content>
		</Layout>
	);
});

export default App;
