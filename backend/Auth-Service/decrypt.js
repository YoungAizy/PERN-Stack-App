import jose from "node-jose";
import fs from 'fs';
const {JWK, JWE,parse} = jose;

async function decrypt(x){
    const private_key = fs.readFileSync('./certs/key.pub');
    let outPut = parse.compact(x);
    console.log(outPut)
    const buffer = Buffer.from(outPut)
    const key = await JWK.asKey(private_key, "pem")
    JWE.createDecrypt(key).
        decrypt(buffer).
        then(function(result) {
          console.log(result)
        });
//    console.log(await key)

    // let keystore = JWK.createKeyStore();
    // await keystore.add(await JWK.asKey(private_key, "pem"));
    // let outPut = parse.compact(x);
    // let decryptedVal = await outPut.perform(keystore);
    // console.log(decryptedVal)
    // console.log('--------------------------------------------')
    // let claims = Buffer.from(decryptedVal.plaintext).toString();
    // console.log('CLAIMS!')
    // console.log(claims)
}
//decrypt('eyJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAiLCJraWQiOiJaZWlHc1B1dlNJbS1qMkV4cFZsemVHdm92ZjdLZnFBV2RVeDctb0NVaXQ4In0.nib_IwbCpigxr5f2nYzwCtw6tqfUjNdRT6_vyyNjZo4t0Km7NBMjJrP19HKxD1Wg7hZFimPssmUyuIGULMFLn8ALQyMML_7Epm-xdRd3vpes03-kslcSfCH3pM5YZ5Dt74jqBy0ivDmTfXGq2vszfFWrXLJKskSpLBlc8J-HhXbcOuAQNryo0AGLtZLp6ecNDKahu72fQK9hAHy_zg5hn1p-dATUZ-8YJC336ah0M4BUw-pMIbS6J0_9RntRqFYzGH1yLvSRSlz3YmNJEFqymiDpRvwFldXq-bvPypeJjW_e-797bgRl_ztdjG6iltKxexzfBPi2iAcphNH9WRNx1JfLvUsBrLK7tJvJW-ZTXPxyU_JeR9KzXyNHEy-FgXGoJMH9b0Xa1qoF96izivXJgOhbZotl1_O07Rb_tWqVw5NtW0LcNpkQvKjPYlJbaUzEg6gSujnHfFMROHrwlSIJbgIHwz1gcAZexi-ar_hyKfnQ4o978VSYTNliPfV2_4ThRgVIA1n_MS2jdT4F0Q3vDKituhAOF2qU-W50aYGeusFmoj438DRdsC5Kw1p1YODYmWVG6i_qNSSHOMt9yb9fweEXIgp-MCVQWm48KBLGJvXNFozrVg45Kf40dM4SD23qSjAxMHdJFZdydTK8-EoC_2DygRzPf8eI74V1RCJMVXE.V0WFEUcPf2iDGE47.HdBzkqGw319V_vm9GubWAddRrV8y3CckhLhwlI6eVb5yM0VBDsJiWB8cFGmWhbQ0Wm1rF3eFIw2cwiCukzXmYwPT5yM9Ik-ze84BAAyr3LDgx3hUF5sx_wHKJoW4DbR2X1sj_LxCwA4IZlbgvF8ZQ8TZZxBJpgBamjSmEQGoiEhNR3dUwrLVnhv_i7cYOLTKxVHCDC-7nzWCRACj7Y6L0nh21PIMAInWKw.y95OlSPjsh_Go-TUT8t03Q')