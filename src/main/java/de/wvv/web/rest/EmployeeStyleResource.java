package de.wvv.web.rest;

import de.wvv.domain.EmployeeStyle;
import de.wvv.repository.EmployeeStyleRepository;
import de.wvv.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link de.wvv.domain.EmployeeStyle}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class EmployeeStyleResource {

    private final Logger log = LoggerFactory.getLogger(EmployeeStyleResource.class);

    private static final String ENTITY_NAME = "employeeStyle";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EmployeeStyleRepository employeeStyleRepository;

    public EmployeeStyleResource(EmployeeStyleRepository employeeStyleRepository) {
        this.employeeStyleRepository = employeeStyleRepository;
    }

    /**
     * {@code POST  /employee-styles} : Create a new employeeStyle.
     *
     * @param employeeStyle the employeeStyle to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new employeeStyle, or with status {@code 400 (Bad Request)} if the employeeStyle has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/employee-styles")
    public ResponseEntity<EmployeeStyle> createEmployeeStyle(@RequestBody EmployeeStyle employeeStyle) throws URISyntaxException {
        log.debug("REST request to save EmployeeStyle : {}", employeeStyle);
        if (employeeStyle.getId() != null) {
            throw new BadRequestAlertException("A new employeeStyle cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EmployeeStyle result = employeeStyleRepository.save(employeeStyle);
        return ResponseEntity.created(new URI("/api/employee-styles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /employee-styles} : Updates an existing employeeStyle.
     *
     * @param employeeStyle the employeeStyle to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated employeeStyle,
     * or with status {@code 400 (Bad Request)} if the employeeStyle is not valid,
     * or with status {@code 500 (Internal Server Error)} if the employeeStyle couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/employee-styles")
    public ResponseEntity<EmployeeStyle> updateEmployeeStyle(@RequestBody EmployeeStyle employeeStyle) throws URISyntaxException {
        log.debug("REST request to update EmployeeStyle : {}", employeeStyle);
        if (employeeStyle.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EmployeeStyle result = employeeStyleRepository.save(employeeStyle);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, employeeStyle.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /employee-styles} : get all the employeeStyles.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of employeeStyles in body.
     */
    @GetMapping("/employee-styles")
    public List<EmployeeStyle> getAllEmployeeStyles() {
        log.debug("REST request to get all EmployeeStyles");
        return employeeStyleRepository.findAll();
    }

    /**
     * {@code GET  /employee-styles/:id} : get the "id" employeeStyle.
     *
     * @param id the id of the employeeStyle to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the employeeStyle, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/employee-styles/{id}")
    public ResponseEntity<EmployeeStyle> getEmployeeStyle(@PathVariable Long id) {
        log.debug("REST request to get EmployeeStyle : {}", id);
        Optional<EmployeeStyle> employeeStyle = employeeStyleRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(employeeStyle);
    }

    /**
     * {@code DELETE  /employee-styles/:id} : delete the "id" employeeStyle.
     *
     * @param id the id of the employeeStyle to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/employee-styles/{id}")
    public ResponseEntity<Void> deleteEmployeeStyle(@PathVariable Long id) {
        log.debug("REST request to delete EmployeeStyle : {}", id);
        employeeStyleRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
