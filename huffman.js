// Huffman coding with Underscore.js

$(document).ready(function() {
	$("#generate").on("click", function() {
		console.log("CLICK!");
		var text = $("#input").val();
		console.log(text);
		var huffmanTable = huffman(text);

		var table = $("#result");
		table.find("tbody").empty();
		_.each(huffmanTable, function(i) {
			var row = $(
					"<tr>" +
						"<td>" + i.key + "</td>" +
						"<td>" + i.num + "</td>" +
						"<td>" + i.code + "</td>" +
					"</tr>");
			table.append(row);
		});
	});
});


function huffman(text) {

	console.log(text);

	var frequencies = _.countBy(text, function (ch) {
		return ch;
	});

	var leafs = _.map(frequencies, function (num, key) {
		return {num: num, key: key};
	});

	var queue = _.sortBy(leafs, function (i) {
		return i.num;
	});

	console.log(frequencies);
	console.log(queue);

	while (queue.length > 1) {
		var node0 = poll(queue)[0];
		var node1 = poll(queue)[0];
		var internalNode = makeNode(node0, node1);
		add(queue, internalNode);
	}

	console.log(queue);
	console.log(leafs);

	_.each(leafs, function(e) {
		e.code = generateCode(e, "");
		console.log(e.key + ": " + e.code);
	});

	return leafs;
}

function add(queue, num) {
    queue.splice(_.sortedIndex(queue, num, "num"), 0, num);
}

function poll(queue) {
    return queue.splice(0, 1);
}

function makeNode(node0, node1) {
	var sum = node0.num + node1.num;
	var parent = {num: sum, child0: node0, child1: node1};
	node0.parent = parent;
	node1.parent = parent;
	return parent;
}

function generateCode(node, code) {
	if (node.parent) {
		code += generateCode(node.parent, code);

		if (node === node.parent.child0) {
			code += 0;
		} else {
			code += 1;
		}
	}

	return code;
}