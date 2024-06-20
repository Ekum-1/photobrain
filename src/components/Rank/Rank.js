import React from "react";

const Rank = ({ userName, userEntries }) => {
	return (
		<div>
			<div className="mid-gray f3">
				{`${userName}, your current submission count is...`}
			</div>
			<div className="mid-gray f2">
				{`${userEntries}`}
			</div>
		</div>
	)
}

export default Rank;