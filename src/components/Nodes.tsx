import React, { useEffect, useState } from "react";
import { getData } from "../api";
import ImageViewer from "./ImageViewer";
import Loading from "./Loading";

interface IParent {
  id: string;
}

interface INode {
  filePath?: string;
  id: string;
  name: string;
  parent: IParent;
  type: string;
}

const Nodes = () => {
  const [nodes, setNodes] = useState<INode[]>([]);
  const [root, setRoot] = useState<{ id: string; name: string }[]>([
    { id: "", name: "root" },
  ]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showFile, setShowFile] = useState<boolean>(false);
  const [fileSrc, setFileSrc] = useState<string>("");
  const DIRECTORY =
    "https://blog.kakaocdn.net/dn/xsIWF/btqy0FoKiho/gggqu7zZHqIaxmO99lklu1/img.png";
  const FILE =
    "https://png.pngtree.com/png-vector/20190118/ourlarge/pngtree-vector-files-icon-png-image_323843.jpg";

  const onClickDirectory: React.MouseEventHandler<HTMLDivElement> = async ({
    currentTarget: { id },
  }) => {
    try {
      setLoading(true);
      const selectedNode = nodes.filter((node) => node.id === id)[0];
      setRoot((prev) => [
        ...prev,
        { id: selectedNode.id, name: selectedNode.name },
      ]);
      const result = await getData(id);
      setNodes(result);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const onClickFile: React.MouseEventHandler<HTMLDivElement> = ({
    currentTarget: { id },
  }) => {
    const selectedNode = nodes.filter((node) => node.id === id)[0];
    if (selectedNode.filePath) {
      setFileSrc(selectedNode.filePath);
      setShowFile(true);
    }
  };

  const onClickPrev: React.MouseEventHandler<HTMLDivElement> = () => {};

  useEffect(() => {
    const getNodes = async () => {
      try {
        setLoading(true);
        const result = await getData();
        setNodes(result);
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    };
    const init = async () => {
      await getNodes();
    };
    init();
  }, [nodes]);

  return (
    <>
      <nav className="Breadcrumb">
        {root.map((r) => (
          <div key={r.id} id={r.id}>
            {r.name}
          </div>
        ))}
      </nav>
      <div className="Nodes">
        {root.length >= 2 && (
          <div className="Node" onClick={onClickPrev}>
            <img
              alt="prev"
              src="data:image/png;base64,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"
            />
          </div>
        )}
        {loading ? (
          <Loading />
        ) : (
          nodes.map((node) => (
            <div
              className="Node"
              id={node.id}
              onClick={
                node.type === "DIRECTORY" ? onClickDirectory : onClickFile
              }
              key={node.id}
            >
              <img
                src={node.type === "DIRECTORY" ? DIRECTORY : FILE}
                alt={node.type}
              />
              <div>{node.name}</div>
            </div>
          ))
        )}
      </div>
      {showFile && <ImageViewer src={fileSrc} setShowFile={setShowFile} />}
    </>
  );
};
export default Nodes;
