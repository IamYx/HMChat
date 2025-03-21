import rcp from "@hms.collaboration.rcp";
class Transfer {
    transfer() {
        const b65 = rcp.createSession();
        let c65 = "http://www.example.com/fetch";
        const d65 = new rcp.Request(c65, "GET");
        d65.transferRange = { from: 20, to: 100 };
        b65.fetch(d65).then((h65) => {
        }).catch((g65) => {
        });
        const e65 = b65.fetch(d65);
        let f65;
        f65 = `${c65} Successfully resumed transfer from breakpoint: ${e65}`;
        b65.close();
    }
}
